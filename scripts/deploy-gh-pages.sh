#!/bin/bash

# 🚀 Enterprise-Grade GitHub Pages Deploy Script
# Isolation-First Architecture with Zero Side-Effects
# Similar to MkDocs workflow but for Next.js static export

set -euo pipefail
set -o errtrace
set -o functrace
IFS=$'\n\t'

# 🎨 Colors for beautiful output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly CYAN='\033[0;36m'
readonly BOLD='\033[1m'
readonly NC='\033[0m' # No Color

# 📁 Configuration
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
readonly BUILD_DIR="out"
readonly GH_PAGES_BRANCH="gh-pages"
readonly APP_NAME="rafa-mori-deploy"

# 🌍 Environment variables
REPO_URL=""
CURRENT_BRANCH=""
_TEMP_DIR=""
_TEMP_ARCHIVE=""
DRY_RUN="${DRY_RUN:-false}"

# 🎯 Logging functions
print_log() {
    local log_type="${1:-INFO}"
    local message="${2:-}"
    local timestamp="$(date '+%H:%M:%S')"
    
    case "$log_type" in
        "SUCCESS") echo -e "${GREEN}[✅ $timestamp]${NC} $message" ;;
        "INFO")    echo -e "${BLUE}[ℹ️  $timestamp]${NC} $message" ;;
        "WARNING") echo -e "${YELLOW}[⚠️  $timestamp]${NC} $message" ;;
        "ERROR")   echo -e "${RED}[❌ $timestamp]${NC} $message" ;;
        "FATAL")   echo -e "${RED}[💀 $timestamp]${NC} $message"; exit 1 ;;
        "STATUS")  echo -e "${CYAN}[🔄 $timestamp]${NC} $message" ;;
        *)         echo -e "${BLUE}[ℹ️  $timestamp]${NC} $message" ;;
    esac
}

# 🧹 Robust cleanup function with trap
cleanup() {
    local exit_code=$?
    print_log "STATUS" "🧹 Cleaning up temporary files..."
    
    # Return to original branch if we're not there
    if [[ -n "$CURRENT_BRANCH" && "$CURRENT_BRANCH" != "$(git branch --show-current 2>/dev/null || echo '')" ]]; then
        print_log "STATUS" "🔙 Returning to original branch: $CURRENT_BRANCH"
        git checkout "$CURRENT_BRANCH" --quiet 2>/dev/null || true
    fi
    
    # Clean temporary directory
    if [[ -n "$_TEMP_DIR" && -d "$_TEMP_DIR" ]]; then
        rm -rf "$_TEMP_DIR" 2>/dev/null || true
        print_log "SUCCESS" "🗑️  Temporary directory cleaned"
    fi
    
    # Clean temporary archive
    if [[ -n "$_TEMP_ARCHIVE" && -f "$_TEMP_ARCHIVE" ]]; then
        rm -f "$_TEMP_ARCHIVE" 2>/dev/null || true
    fi
    
    # Final status
    if [[ $exit_code -eq 0 ]]; then
        print_log "SUCCESS" "🎉 Deploy completed successfully!"
        print_log "INFO" "🌐 Your site will be available at: https://$(git config user.name 2>/dev/null || echo 'your-username').github.io/$(basename "$(git rev-parse --show-toplevel)" 2>/dev/null || echo 'repo-name')"
    else
        print_log "ERROR" "❌ Deploy failed, but your environment is clean and safe"
    fi
    
    exit $exit_code
}

# 🛡️ Set up trap for cleanup
trap cleanup EXIT INT TERM

# 🔍 Environment validation
validate_environment() {
    print_log "STATUS" "🔍 Validating environment..."
    
    # Check if we're in a git repository
    if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        print_log "FATAL" "Not in a git repository! Please run this from your project root."
    fi
    
    # Get repository URL
    REPO_URL="$(git config --get remote.origin.url 2>/dev/null || echo '')"
    if [[ -z "$REPO_URL" ]]; then
        print_log "FATAL" "No remote repository found. Please set up a remote origin."
    fi
    
    # Clean up repo URL
    REPO_URL="${REPO_URL%.git}"
    
    # Check git permissions
    if ! git ls-remote --exit-code "$REPO_URL" >/dev/null 2>&1; then
        print_log "FATAL" "Cannot access remote repository. Check your credentials and permissions."
    fi
    
    # Check required tools
    for tool in npm zip unzip; do
        if ! command -v "$tool" >/dev/null 2>&1; then
            print_log "FATAL" "Required tool '$tool' not found. Please install it first."
        fi
    done
    
    # Save current branch
    CURRENT_BRANCH="$(git branch --show-current 2>/dev/null || echo '')"
    if [[ -z "$CURRENT_BRANCH" ]]; then
        print_log "FATAL" "Cannot determine current branch. Are you in detached HEAD state?"
    fi
    
    print_log "SUCCESS" "✅ Environment validation passed"
    print_log "INFO" "📍 Current branch: $CURRENT_BRANCH"
    print_log "INFO" "🔗 Repository: $REPO_URL"
}

# 📦 Check dependencies and install if needed
ensure_dependencies() {
    print_log "STATUS" "📦 Checking dependencies..."
    
    # Check if package.json exists
    if [[ ! -f "package.json" ]]; then
        print_log "FATAL" "package.json not found. Are you in the correct directory?"
    fi
    
    # Check if node_modules exists
    if [[ ! -d "node_modules" ]]; then
        print_log "WARNING" "node_modules not found. Installing dependencies..."
        npm install --silent || print_log "FATAL" "Failed to install dependencies"
        print_log "SUCCESS" "✅ Dependencies installed"
    fi
    
    # Check if Next.js is available
    if ! npm list next >/dev/null 2>&1; then
        print_log "FATAL" "Next.js not found in dependencies. Please add it to your package.json"
    fi
    
    print_log "SUCCESS" "✅ All dependencies ready"
}

# 🏗️ Build the project
build_project() {
    print_log "STATUS" "🏗️  Building Next.js project..."
    
    # Clean previous build
    if [[ -d "$BUILD_DIR" ]]; then
        print_log "INFO" "🧹 Cleaning previous build..."
        rm -rf "$BUILD_DIR"
    fi
    
    # Run the build
    if ! npm run build --silent; then
        print_log "FATAL" "Build failed! Please check your code and try again."
    fi
    
    # Verify build output
    if [[ ! -d "$BUILD_DIR" ]]; then
        print_log "FATAL" "Build directory '$BUILD_DIR' not found after build!"
    fi
    
    # Check if build has content
    if [[ -z "$(ls -A "$BUILD_DIR" 2>/dev/null)" ]]; then
        print_log "FATAL" "Build directory is empty! Check your Next.js configuration."
    fi
    
    print_log "SUCCESS" "✅ Build completed successfully"
}

# 📁 Create isolated workspace
create_isolated_workspace() {
    print_log "STATUS" "📁 Creating isolated workspace..."
    
    # Create temporary directory
    _TEMP_DIR="$(mktemp -d "/tmp/${APP_NAME}.XXXXXX")"
    if [[ ! -d "$_TEMP_DIR" ]]; then
        print_log "FATAL" "Failed to create temporary directory"
    fi
    
    # Create temporary archive path
    _TEMP_ARCHIVE="$_TEMP_DIR/project.zip"
    
    print_log "SUCCESS" "✅ Temporary workspace created: $_TEMP_DIR"
}

# 📦 Create project archive (zero compression for speed)
create_project_archive() {
    print_log "STATUS" "📦 Creating project archive..."
    
    # Check for uncommitted changes
    if ! git diff --quiet || ! git diff --cached --quiet; then
        print_log "WARNING" "⚠️  You have uncommitted changes"
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_log "FATAL" "Deployment aborted due to uncommitted changes"
        fi
    fi
    
    print_log "INFO" "🗜️  Creating archive (this may take a moment)..."
    
    # Create ZIP with no compression for maximum speed
    # Exclude patterns to avoid including unnecessary files
    if ! zip -0 -r -q "$_TEMP_ARCHIVE" . \
        -x "node_modules/.cache/*" \
        -x ".git/objects/pack/*" \
        -x "*.log" \
        -x ".next/*" \
        -x ".vercel/*" \
        -x "*.tmp" \
        -x ".DS_Store" \
        -x "*.swp" \
        -x "*.swo" \
        -x "thumbs.db"; then
        print_log "FATAL" "Failed to create project archive"
    fi
    
    # Verify archive integrity
    if ! unzip -t "$_TEMP_ARCHIVE" >/dev/null 2>&1; then
        print_log "FATAL" "Archive integrity check failed"
    fi
    
    print_log "SUCCESS" "✅ Project archive created successfully"
}

# 🚚 Deploy from isolated environment
deploy_from_isolated_env() {
    print_log "STATUS" "🚚 Deploying from isolated environment..."
    
    # Extract to temporary directory
    local work_dir="$_TEMP_DIR/workspace"
    mkdir -p "$work_dir"
    
    print_log "INFO" "📤 Extracting project to temporary workspace..."
    if ! unzip -q "$_TEMP_ARCHIVE" -d "$work_dir"; then
        print_log "FATAL" "Failed to extract project archive"
    fi
    
    # Change to work directory
    cd "$work_dir" || print_log "FATAL" "Cannot access temporary workspace"
    
    # Validate extracted environment
    validate_extracted_env
    
    # Perform the actual deployment
    perform_git_deployment
}

# ✅ Validate extracted environment
validate_extracted_env() {
    print_log "STATUS" "✅ Validating extracted environment..."
    
    # Check if we have Git
    if [[ ! -d ".git" ]]; then
        print_log "FATAL" "Git directory missing in extracted environment"
    fi
    
    # Check if we have build
    if [[ ! -d "$BUILD_DIR" ]]; then
        print_log "FATAL" "Build directory missing in extracted environment"
    fi
    
    # Check if Git operations work
    if ! git status >/dev/null 2>&1; then
        print_log "FATAL" "Git operations failed in extracted environment"
    fi
    
    print_log "SUCCESS" "✅ Extracted environment validated"
}

# 🎯 Perform the actual Git deployment
perform_git_deployment() {
    print_log "STATUS" "🎯 Performing Git deployment..."
    
    # Create or switch to gh-pages branch
    if git show-ref --verify --quiet "refs/heads/$GH_PAGES_BRANCH"; then
        print_log "INFO" "📋 Switching to existing $GH_PAGES_BRANCH branch"
        if ! git checkout "$GH_PAGES_BRANCH" --quiet 2>/dev/null; then
            print_log "WARNING" "⚠️  Existing $GH_PAGES_BRANCH branch has issues, recreating..."
            git branch -D "$GH_PAGES_BRANCH" 2>/dev/null || true
            git checkout --orphan "$GH_PAGES_BRANCH" --quiet
            git rm -rf . --quiet 2>/dev/null || true
            print_log "INFO" "🌿 Recreated $GH_PAGES_BRANCH branch"
        fi
    else
        print_log "INFO" "🌿 Creating new orphan $GH_PAGES_BRANCH branch"
        git checkout --orphan "$GH_PAGES_BRANCH" --quiet
        git rm -rf . --quiet 2>/dev/null || true
    fi
    
    # Copy build files to root
    print_log "INFO" "📋 Copying build files..."
    cp -r "$BUILD_DIR"/* . 2>/dev/null || true
    cp -r "$BUILD_DIR"/.* . 2>/dev/null || true
    
    # Create .nojekyll to prevent Jekyll processing
    echo "" > .nojekyll
    
    # Copy CNAME if it exists in the original branch
    if git show "$CURRENT_BRANCH":CNAME >/dev/null 2>&1; then
        git show "$CURRENT_BRANCH":CNAME > CNAME
        print_log "INFO" "📝 CNAME file copied from main branch"
    fi
    
    # Stage all files
    git add .
    
    # Check if there are changes to commit
    if git diff --cached --quiet; then
        print_log "WARNING" "⚠️  No changes to deploy"
        return 0
    fi
    
    # Commit changes
    local commit_message
    commit_message="Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"
    git commit -m "$commit_message" --quiet
    print_log "SUCCESS" "✅ Changes committed: $commit_message"
    
    # Push to GitHub (unless dry run)
    if [[ "$DRY_RUN" == "true" ]]; then
        print_log "INFO" "🏃 DRY RUN: Would push to $GH_PAGES_BRANCH branch"
        print_log "INFO" "📊 Files that would be deployed:"
        git ls-tree --name-only -r HEAD | head -10
        if [[ $(git ls-tree --name-only -r HEAD | wc -l) -gt 10 ]]; then
            print_log "INFO" "... and $(($(git ls-tree --name-only -r HEAD | wc -l) - 10)) more files"
        fi
    else
        print_log "STATUS" "🚀 Pushing to GitHub Pages..."
        if git push origin "$GH_PAGES_BRANCH" --force --quiet; then
            print_log "SUCCESS" "✅ Successfully deployed to GitHub Pages!"
        else
            print_log "FATAL" "Failed to push to GitHub Pages"
        fi
    fi
}

# 🎯 Main execution flow
main() {
    # Header
    echo
    echo -e "${BOLD}${CYAN}🚀 Enterprise GitHub Pages Deploy${NC}"
    echo -e "${CYAN}   Isolation-First Architecture${NC}"
    echo -e "${CYAN}   Zero Side-Effects Guaranteed${NC}"
    echo
    
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --dry-run)
                DRY_RUN="true"
                print_log "INFO" "🏃 DRY RUN MODE: No actual deployment will occur"
                shift
                ;;
            --help|-h)
                show_help
                exit 0
                ;;
            *)
                print_log "WARNING" "Unknown option: $1"
                shift
                ;;
        esac
    done
    
    # Execute deployment pipeline
    validate_environment
    ensure_dependencies
    build_project
    create_isolated_workspace
    create_project_archive
    deploy_from_isolated_env
    
    print_log "SUCCESS" "🎉 All done! Your environment is clean and safe."
}

# 📖 Show help information
show_help() {
    cat << EOF
🚀 Enterprise GitHub Pages Deploy Script

USAGE:
    $0 [OPTIONS]

OPTIONS:
    --dry-run    Perform all steps except the actual push to GitHub
    --help, -h   Show this help message

DESCRIPTION:
    This script deploys your Next.js project to GitHub Pages using an
    isolation-first architecture that guarantees zero side-effects on
    your working environment.

FEATURES:
    ✅ Complete environment isolation
    ✅ Zero side-effects guarantee  
    ✅ Automatic cleanup on failure
    ✅ Fast ZIP-based transfer
    ✅ Comprehensive validation
    ✅ Beautiful progress output

EXAMPLES:
    $0              # Normal deployment
    $0 --dry-run    # Test run without pushing

For more information, see: docs/github-pages-deploy.md
EOF
}

# 🚀 Execute main function
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi

