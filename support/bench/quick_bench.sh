#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${1:-https://analyzer.kubex.world}"
KEY="${GROQ_API_KEY:-}"

LOGFILE="bench_$(date +%Y%m%d_%H%M).log"
TMPFILE=$(mktemp)

echo "🚀 Quick Bench coletivo — $DOMAIN" | tee -a "$LOGFILE"
echo "==========================================" | tee -a "$LOGFILE"

bench() {
  local name="$1" url="$2" opts="${3:-}"
  {
    echo -e "\n▶️  $name ($url)"
    for i in {1..5}; do
      curl -sS -w "req=%n code:%{http_code} total:%{time_total}s size:%{size_download}\n" -o /dev/null "$url/v1/health"
      
      # curl -s -o /dev/null -w "req=$i code:%{http_code} time_total:%{time_total}s size:%{size_download}\n" "$opts" "$url"
    done
  } | tee -a "$LOGFILE" | tee -a "$TMPFILE"
}
bash --version | tee -a "$LOGFILE"

echo "Domain: $DOMAIN" | tee -a "$LOGFILE"
echo "Log file: $LOGFILE" | tee -a "$LOGFILE"
echo "==========================================" | tee -a "$LOGFILE"
# 1. Healthcheck
bench "Healthcheck (x5)" "$DOMAIN/v1/health"

# 2. Landing
bench "Landing page (x5)" "$DOMAIN/"

# 3. Chat (se KEY disponível)
if [[ -n "$KEY" ]]; then
  {
    echo -e "\n▶️  Chat completions (Groq, 1x)"
    curl -s -o /dev/null -w "code:%{http_code} time_total:%{time_total}s\n" \
      -H "Authorization: Bearer $KEY" \
      -H "Content-Type: application/json" \
      -d '{"provider":"groq","model":"llama-3.1-8b-instant","messages":[{"role":"user","content":"ping coletivo"}}]' \
      "$DOMAIN/v1/chat"
  } | tee -a "$LOGFILE" | tee -a "$TMPFILE"
else
  echo -e "\n⚠️  Sem KEY definida (export OPENAI_API_KEY=xxx), pulando teste de chat." | tee -a "$LOGFILE"
fi

# 4. Stress linear
{
  echo -e "\n▶️  Stress linear (20 reqs em sequência ao health)"
  for i in {1..20}; do
    curl -s -o /dev/null -w "req=$i code:%{http_code} time_total:%{time_total}s\n" "$DOMAIN/v1/health"
  done
} | tee -a "$LOGFILE" | tee -a "$TMPFILE"

# 5. Burst paralelo
{
  echo -e "\n▶️  Burst paralelo (10 reqs simultâneas ao health)"
  seq 1 10 | xargs -n1 -P10 -I{} curl -s -o /dev/null \
    -w "req={} code:%{http_code} time_total:%{time_total}s\n" \
    "$DOMAIN/v1/health"
} | tee -a "$LOGFILE" | tee -a "$TMPFILE"

# 6. Resumo estatístico
echo -e "\n📊 Resumo (tempo_total em segundos)" | tee -a "$LOGFILE"
grep -o 'time_total:[0-9.]\+' "$TMPFILE" | cut -d: -f2 | \
awk '{
  n[NR]=$1; sum+=$1;
}
END {
  asort(n);
  mean = sum/NR;
  p50 = (NR%2 ? n[(NR+1)/2] : (n[NR/2]+n[NR/2+1])/2);
  p90 = n[int(0.9*NR)];
  printf "Média: %.4fs\np50: %.4fs\np90: %.4fs\n", mean, p50, p90;
}' | tee -a "$LOGFILE"

rm -f "$TMPFILE"

echo -e "\n✅ Bench coletivo concluído! Log salvo em $LOGFILE"
