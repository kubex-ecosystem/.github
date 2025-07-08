# Melhorias sugeridas para o script de deploy

## 1. **Otimização do ZIP**
```bash
# Use store (sem compressão) + exclude patterns
zip -0 -r -q "$TEMP_ARCHIVE" . \
  -x "node_modules/*" \
  -x ".git/objects/pack/*" \
  -x "*.log" \
  -x ".next/*" \
  -x "out/*" \
  -x ".vercel/*"
```

## 2. **Trap mais robusto**
```bash
cleanup() {
    local exit_code=$?
    print_log "STATUS" "Cleaning up temporary files..."
    
    # Voltar para branch original se necessário
    if [[ "$CURRENT_BRANCH" != "$(git branch --show-current)" ]]; then
        git checkout "$CURRENT_BRANCH" --quiet 2>/dev/null || true
    fi
    
    # Limpar temp
    [[ -d "$_TEMP_DIR" ]] && rm -rf "$_TEMP_DIR"
    
    # Se teve erro, avisar
    if [[ $exit_code -ne 0 ]]; then
        print_log "ERROR" "Script failed, but environment is clean"
    fi
    
    exit $exit_code
}

trap cleanup EXIT INT TERM
```

## 3. **Verificação de integridade**
```bash
# Antes de descompactar, verificar se ZIP está íntegro
if ! unzip -t "$TEMP_ARCHIVE" >/dev/null 2>&1; then
    print_log "FATAL" "Archive integrity check failed"
fi
```

## 4. **Progress feedback**
```bash
# Mostrar progresso das operações demoradas
print_log "STATUS" "Creating archive... (this may take a moment)"
zip -0 -r -q "$TEMP_ARCHIVE" . -x "..." 2>&1 | \
    while read -r line; do 
        printf "."
    done
echo " ✅"
```

## 5. **Validação do ambiente temp**
```bash
# Garantir que o ambiente temp tem tudo necessário
validate_temp_env() {
    local temp_dir="$1"
    cd "$temp_dir" || print_log "FATAL" "Cannot access temp directory"
    
    # Verificar se tem .git
    [[ -d ".git" ]] || print_log "FATAL" "Git directory missing in temp"
    
    # Verificar se tem build
    [[ -d "out" ]] || print_log "FATAL" "Build directory missing in temp"
    
    # Verificar se pode fazer operações Git
    git status >/dev/null 2>&1 || print_log "FATAL" "Git operations failed in temp"
}
```
