#!/usr/bin/env bash

_base_path=$(realpath ./support/bench/)

chmod +x "${_bench_path}"

_bench_wrp=( "${_base_pat:-}/kubex_bench.sh" )

# padrão (domain default do script) -> ./kubex_bench.sh
("${_bench_wrp[@]}" "$@")

# customizando domínio e tempos
("${_bench_wrp[@]}" "$@" DOMAIN=https://analyzer.kubex.world TIMEOUT=6)

# incluindo /v1/chat (BYOK) e mudando provider
export OPENAI_API_KEY=sk-xxxxx
PROVIDER=groq DOMAIN=https://analyzer.kubex.world "${_bench_wrp}"

# ajustando cargas
RUNS_HEALTH=10 RUNS_LINEAR=50 BURST_PARALLEL=20 "${_bench_wrp}"
