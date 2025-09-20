#!/usr/bin/env bash
# kubex_bench.sh — bench leve com "curl abstrato" e cenários dinâmicos
# Requer: bash 4+ (assoc arrays), coreutils, awk
set -euo pipefail

# ---------- defaults ----------
DOMAIN="${DOMAIN:-https://analyzer.kubex.world}"
PROVIDER="${PROVIDER:-groq}"              # openai|anthropic|groq (só p/ /v1/chat)
KEY="${OPENAI_API_KEY:-}"                 # opcional BYOK (usa export OPENAI_API_KEY=sk-xxx)
RUNS_HEALTH="${RUNS_HEALTH:-5}"
RUNS_LANDING="${RUNS_LANDING:-5}"
RUNS_LINEAR="${RUNS_LINEAR:-20}"
BURST_PARALLEL="${BURST_PARALLEL:-10}"
TIMEOUT="${TIMEOUT:-8}"
LOGFILE="${LOGFILE:-bench_$(date +%Y%m%d_%H%M).log}"

# ---------- helpers ----------
die(){ echo "erro: $*" >&2; exit 1; }

host_from_url(){
  local u="$1"; echo "$u" | sed -E 's@https?://([^/]+).*@\1@'
}

dns_check(){
  local host; host="$(host_from_url "$DOMAIN")"
  local ip; ip="$(getent ahosts "$host" 2>/dev/null | awk '/STREAM/ {print $1; exit}')"
  [[ -n "${ip:-}" ]] || die "DNS não resolve para $host (DOMAIN=$DOMAIN)."
  echo "🌐 $host → $ip" | tee -a "$LOGFILE"
}

# Monta dinamicamente o comando curl em array global CURL_CMD (sem eval)
# Uso: get_curl_cmd <url> <assoc_name>
get_curl_cmd() {
  local url="$1"; local opt_name="${2:-opts}"; declare -n _o="$opt_name"
  local -a cmd=(curl -sS)
  [[ "${_o[follow]:-false}" == "true" ]] && cmd+=(-L)
  [[ -n "${_o[timeout]:-}" ]] && cmd+=(--max-time "${_o[timeout]}")

  [[ -n "${_o[method]:-}" ]] && cmd+=(-X "${_o[method]}")
  if [[ -n "${_o[data]:-}" ]]; then
    cmd+=(-H "Content-Type: application/json" -d "${_o[data]}")
  fi

  for k in "${!_o[@]}"; do
    [[ "$k" == header__* ]] || continue
    cmd+=(-H "${k#header__}: ${_o[$k]}")
  done

  # output & write-format
  cmd+=(-o "${_o[out]:-/dev/null}")
  local -a wf=()
  [[ "${_o[w_req]:-true}"  != "false" ]] && wf+=("req:%n")
  [[ "${_o[w_code]:-true}" != "false" ]] && wf+=("code:%{http_code}")
  [[ "${_o[w_size]:-}" == "true" ]]      && wf+=("size:%{size_download}")
  [[ "${_o[w_tot]:-}"  == "true" ]]      && wf+=("time_total:%{time_total}s")
  [[ ${#wf[@]} -gt 0 ]] && cmd+=(-w "$(IFS=' '; echo "${wf[*]}")\n")

  cmd+=("$url")
  declare -g -a CURL_CMD; CURL_CMD=("${cmd[@]}")
}

summarize_times(){
  awk '
    match($0,/time_total:([0-9.]+)/,m){ t[++N]=m[1]; s+=m[1] }
    END{
      if(N==0){ print "— sem amostras —"; exit }
      n=N; asort(t)
      mean=s/N
      p50 = (N%2? t[(N+1)/2] : (t[N/2]+t[N/2+1])/2)
      idx=int(0.9*N); if(idx<1) idx=1; if(idx>N) idx=N
      p90=t[idx]
      printf "Média: %.4fs | p50: %.4fs | p90: %.4fs (n=%d)\n", mean,p50,p90,N
    }' "$1"
}

run_block(){ # name url runs opts_assoc
  local name="${1:-}" url="${2:-}" runs="${3:-}" opt_name="${4:-}"
  local tmp; tmp="$(mktemp)"; echo -e "\n▶️  $name ($url) x${runs}" | tee -a "$LOGFILE"
  for ((i=1;i<=runs;i++)); do
    get_curl_cmd "$url" "$opt_name"
    "${CURL_CMD[@]}" | tee -a "$LOGFILE" | tee -a "$tmp" >/dev/null
  done
  echo -n "📊 ${name}: " | tee -a "$LOGFILE"
  summarize_times "$tmp" | tee -a "$LOGFILE"
  rm -f "$tmp"
}

run_parallel(){ # name url parallel opts_assoc
  local name="$1" url="$2" par="$3" opt_name="$4"
  local tmp; tmp="$(mktemp)"
  echo -e "\n▶️  $name ($url) P=${par}" | tee -a "$LOGFILE"

  local pids=()
  for ((i=1;i<=par;i++)); do
    get_curl_cmd "$url" "$opt_name"
    (
      "${CURL_CMD[@]}"
    ) | tee -a "$LOGFILE" | tee -a "$tmp" >/dev/null &
    pids+=($!)
  done

  wait "${pids[@]}"

  echo -n "📊 ${name}: " | tee -a "$LOGFILE"
  summarize_times "$tmp" | tee -a "$LOGFILE"
  rm -f "$tmp"
}

# ---------- main ----------
echo "🚀 Quick Bench coletivo — $DOMAIN" | tee -a "$LOGFILE"
echo "==========================================" | tee -a "$LOGFILE"
dns_check

# opções base
# shellcheck disable=SC2034
declare -A BASE_OPTS=(
  [follow]="true" [timeout]="${TIMEOUT}" [out]="/dev/null"
  [w_req]="false" [w_code]="true" [w_size]="true" [w_tot]="true"
  [header__User-Agent]="KubexBench/1.1"
)

# 1) Health xN
run_block "Healthcheck" "${DOMAIN}/v1/health" "${RUNS_HEALTH}" BASE_OPTS

# 2) Landing xN
run_block "Landing" "${DOMAIN}/" "${RUNS_LANDING}" BASE_OPTS

# 3) Chat (1x) se KEY
if [[ -n "$KEY" ]]; then
  declare -A CHAT_OPTS=(
    [follow]="true" [timeout]="${TIMEOUT}" [out]="/dev/null"
    [w_req]="true" [w_code]="true" [w_size]="true" [w_tot]="true"
    [header__User-Agent]="KubexBench/1.1"
    [header__Authorization]="Bearer ${KEY}"
    # provider-aware
  )
  # payload por provider
  case "$PROVIDER" in
    anthropic)
      CHAT_OPTS[data]='{"model":"claude-3-haiku-20240307","max_tokens":128,"messages":[{"role":"user","content":"ping coletivo"}]}'
      CHAT_OPTS[header__anthropic-version]="2023-06-01"
      ;;
    openai|groq|*)
      CHAT_OPTS[data]='{"model":"llama-3.1-8b-instant","stream":false,"messages":[{"role":"user","content":"ping coletivo"}]}'
      ;;
  esac
  # shellcheck disable=SC2034
  CHAT_OPTS[method]="POST"
  run_block "Chat (/v1/chat)" "${DOMAIN}/v1/chat" 1 CHAT_OPTS
else
  echo -e "\n⚠️  Sem KEY (export OPENAI_API_KEY=xxx). Pulando /v1/chat." | tee -a "$LOGFILE"
fi

# 4) Stress linear health (20)
run_block "Stress linear (health)" "${DOMAIN}/v1/health" "${RUNS_LINEAR}" BASE_OPTS

# 5) Burst paralelo (10)
run_parallel "Burst paralelo (health)" "${DOMAIN}/v1/health" "${BURST_PARALLEL}" BASE_OPTS

echo -e "\n✅ Bench coletivo concluído! Log salvo em ${LOGFILE}"
