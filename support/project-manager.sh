#!/bin/bash

# 🎯 Centralized Project Manager Script
# Universal interface for rafa-mori project operations
# Compatible with standardized Makefile across all projects

set -euo pipefail

# 🎨 Colors matching Makefile style
readonly COLOR_GREEN='\033[32m'
readonly COLOR_YELLOW='\033[33m'
readonly COLOR_RED='\033[31m'
readonly COLOR_BLUE='\033[34m'
readonly COLOR_RESET='\033[0m'

# 📁 Configuration
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
readonly ENTERPRISE_DEPLOY="$PROJECT_ROOT/support/deploy-gh-pages.sh"

# 🎯 Logging functions (exactly matching Makefile)
log() {
    printf "%b%s%b %s\n" "${COLOR_BLUE}" "[LOG]" "${COLOR_RESET}" "$1"
}

log_info() {
    printf "%b%s%b %s\n" "${COLOR_BLUE}" "[INFO]" "${COLOR_RESET}" "$1"
}

log_success() {
    printf "%b%s%b %s\n" "${COLOR_GREEN}" "[SUCCESS]" "${COLOR_RESET}" "$1"
}

log_warning() {
    printf "%b%s%b %s\n" "${COLOR_YELLOW}" "[WARNING]" "${COLOR_RESET}" "$1"
}

log_error() {
    printf "%b%s%b %s\n" "${COLOR_RED}" "[ERROR]" "${COLOR_RESET}" "$1"
}

# 🚀 Command implementations
cmd_start() {
    log_info "Starting project in production mode..."
    cd "$PROJECT_ROOT" || exit 1
    
    if [[ ! -d "node_modules" ]]; then
        log_info "Installing dependencies..."
        npm install --silent
    fi
    
    if [[ ! -d "out" ]]; then
        log_info "Building project..."
        npm run build
    fi
    
    log_info "Serving production build..."
    log_info "Access at: http://localhost:3000"
    npm run serve:static
}

cmd_start_dev() {
    log_info "Starting project in development mode..."
    cd "$PROJECT_ROOT" || exit 1
    
    if [[ ! -d "node_modules" ]]; then
        log_info "Installing dependencies..."
        npm install
    fi
    
    log_info "Starting development server..."
    log_info "Access at: http://localhost:3000"
    npm run dev
}

cmd_test() {
    log_info "Running quick tests..."
    cd "$PROJECT_ROOT" || exit 1
    
    # Basic validations
    log_info "Checking package.json..."
    if [[ ! -f "package.json" ]]; then
        log_error "package.json not found!"
        exit 1
    fi
    
    log_info "Checking Next.js configuration..."
    if [[ ! -f "next.config.js" ]]; then
        log_error "next.config.js not found!"
        exit 1
    fi
    
    log_info "Validating deploy script..."
    if [[ -x "$ENTERPRISE_DEPLOY" ]]; then
        bash -n "$ENTERPRISE_DEPLOY" || {
            log_error "Deploy script has syntax errors!"
            exit 1
        }
    fi
    
    log_success "Quick tests passed!"
}

cmd_test_full() {
    log_info "Running full test suite..."
    cd "$PROJECT_ROOT" || exit 1
    
    # Run quick tests first
    cmd_test
    
    # Additional comprehensive tests
    log_info "Testing build process..."
    npm run build > /dev/null 2>&1 || {
        log_error "Build test failed!"
        exit 1
    }
    
    log_info "Testing deploy script (dry run)..."
    if [[ -x "$ENTERPRISE_DEPLOY" ]]; then
        "$ENTERPRISE_DEPLOY" --dry-run > /dev/null 2>&1 || {
            log_error "Deploy dry run failed!"
            exit 1
        }
    fi
    
    log_success "Full test suite passed!"
}

cmd_lint() {
    log_info "Running code linting..."
    cd "$PROJECT_ROOT" || exit 1
    
    if npm list next >/dev/null 2>&1; then
        log_info "Running Next.js lint..."
        npm run lint || {
            log_warning "Linting found issues"
            return 1
        }
    else
        log_warning "Next.js not found, running basic checks..."
        
        # Basic file structure checks
        for file in package.json next.config.js src/app/layout.tsx; do
            if [[ ! -f "$file" ]]; then
                log_error "Required file missing: $file"
                exit 1
            fi
        done
    fi
    
    log_success "Linting completed!"
}

cmd_format() {
    log_info "Formatting code..."
    cd "$PROJECT_ROOT" || exit 1
    
    if command -v prettier >/dev/null 2>&1; then
        log_info "Running Prettier..."
        npx prettier --write "src/**/*.{ts,tsx,js,jsx}" 2>/dev/null || true
        log_success "Code formatted with Prettier!"
    else
        log_warning "Prettier not available, skipping formatting..."
    fi
}

cmd_clean() {
    log_info "Cleaning temporary files..."
    cd "$PROJECT_ROOT" || exit 1
    
    # Clean build outputs
    rm -rf out/ .next/ dist/ build/
    
    # Clean logs
    rm -f *.log npm-debug.log* yarn-debug.log* yarn-error.log*
    
    # Clean OS files
    find . -name ".DS_Store" -delete 2>/dev/null || true
    find . -name "Thumbs.db" -delete 2>/dev/null || true
    find . -name "*.tmp" -delete 2>/dev/null || true
    
    log_success "Temporary files cleaned!"
}

cmd_build() {
    log_info "Building project..."
    cd "$PROJECT_ROOT" || exit 1
    
    # Ensure clean build
    log_info "Cleaning previous build..."
    rm -rf out/ .next/
    
    # Install dependencies if needed
    if [[ ! -d "node_modules" ]]; then
        log_info "Installing dependencies..."
        npm install
    fi
    
    # Build the project
    log_info "Running Next.js build..."
    npm run build
    
    # Verify build output
    if [[ ! -d "out" ]] || [[ -z "$(ls -A out/ 2>/dev/null)" ]]; then
        log_error "Build failed - no output generated!"
        exit 1
    fi
    
    local file_count
    file_count=$(find out -type f | wc -l)
    log_success "Build completed! Generated $file_count files in out/"
}

cmd_publish() {
    log_info "Publishing to GitHub Pages..."
    cd "$PROJECT_ROOT" || exit 1
    
    if [[ ! -x "$ENTERPRISE_DEPLOY" ]]; then
        log_error "Enterprise deploy script not found: $ENTERPRISE_DEPLOY"
        exit 1
    fi
    
    # Use our enterprise deployment system
    log_info "Using Enterprise GitHub Pages Deploy System..."
    "$ENTERPRISE_DEPLOY"
}

cmd_structure() {
    log_info "Checking project structure..."
    cd "$PROJECT_ROOT" || exit 1
    
    echo ""
    echo "📁 Project Structure Overview"
    echo "=============================="
    
    # Core files
    echo ""
    echo "📄 Core Configuration Files:"
    local core_files=("package.json" "next.config.js" "tailwind.config.js" "tsconfig.json" "README.md")
    for file in "${core_files[@]}"; do
        if [[ -f "$file" ]]; then
            echo "  ✅ $file"
        else
            echo "  ❌ $file (missing)"
        fi
    done
    
    # Main directories
    echo ""
    echo "📂 Main Directories:"
    local main_dirs=("src" "public" "scripts" "support" "docs" "tools")
    for dir in "${main_dirs[@]}"; do
        if [[ -d "$dir" ]]; then
            local item_count
            item_count=$(find "$dir" -maxdepth 1 -type f | wc -l)
            echo "  ✅ $dir/ ($item_count files)"
        else
            echo "  ❌ $dir/ (missing)"
        fi
    done
    
    # Build status
    echo ""
    echo "🏗️ Build Status:"
    if [[ -d "out" ]]; then
        local build_files
        build_files=$(find out -type f | wc -l)
        echo "  ✅ Build exists ($build_files files)"
    else
        echo "  ❌ No build found (run 'make build')"
    fi
    
    echo ""
    log_success "Structure check completed!"
}

# 📖 Show help
show_help() {
    echo "🚀 rafa-mori Project Manager"
    echo "============================"
    echo ""
    echo "USAGE: $0 <command>"
    echo ""
    echo "COMMANDS:"
    echo "  start         Start in production mode (serve built files)"
    echo "  start-dev     Start in development mode (live reload)"
    echo "  test          Run quick validation tests"
    echo "  test-full     Run comprehensive test suite"
    echo "  lint          Check code quality and standards"
    echo "  format        Format code with Prettier"
    echo "  clean         Clean temporary and build files"
    echo "  build         Build the project for production"
    echo "  publish       Deploy to GitHub Pages (enterprise-grade)"
    echo "  structure     Show project structure overview"
    echo ""
    echo "EXAMPLES:"
    echo "  $0 start-dev     # Start development server"
    echo "  $0 build         # Build for production"
    echo "  $0 publish       # Deploy to GitHub Pages"
    echo ""
    echo "MAKEFILE INTEGRATION:"
    echo "  make start-dev   # Same as: $0 start-dev"
    echo "  make build       # Same as: $0 build"
    echo "  make publish     # Same as: $0 publish"
    echo ""
    echo "🎯 This script provides a standardized interface across"
    echo "   all rafa-mori projects for consistent workflows."
}

# 🎯 Main execution
main() {
    local command="${1:-help}"
    
    case "$command" in
        "start")        cmd_start ;;
        "start-dev")    cmd_start_dev ;;
        "test")         cmd_test ;;
        "test-full")    cmd_test_full ;;
        "lint")         cmd_lint ;;
        "format")       cmd_format ;;
        "clean")        cmd_clean ;;
        "build")        cmd_build ;;
        "publish")      cmd_publish ;;
        "structure")    cmd_structure ;;
        "help"|"-h"|"--help") show_help ;;
        *)
            log_error "Unknown command: $command"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# 🚀 Execute
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
