#!/bin/bash

# Deploy script for GitHub Pages
# Similar to MkDocs workflow but for Next.js static export

set -e  # Exit on any error

echo "🚀 Starting GitHub Pages deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BRANCH_NAME="gh-pages"
BUILD_DIR="out"
REPO_URL=$(git config --get remote.origin.url)

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Not in a git repository!"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    print_warning "You have uncommitted changes. Please commit or stash them first."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Save current branch
CURRENT_BRANCH=$(git branch --show-current)
print_status "Current branch: $CURRENT_BRANCH"

# Clean previous build
print_status "Cleaning previous build..."
rm -rf $BUILD_DIR

# Build the project
print_status "Building Next.js project..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Build failed!"
    exit 1
fi

print_success "Build completed successfully!"

# Check if build directory exists
if [ ! -d "$BUILD_DIR" ]; then
    print_error "Build directory '$BUILD_DIR' not found!"
    exit 1
fi

# Create or switch to gh-pages branch
print_status "Switching to $BRANCH_NAME branch..."

if git show-ref --verify --quiet refs/heads/$BRANCH_NAME; then
    # Branch exists, switch to it
    git checkout $BRANCH_NAME
    print_status "Switched to existing $BRANCH_NAME branch"
else
    # Branch doesn't exist, create it
    git checkout --orphan $BRANCH_NAME
    git rm -rf .
    print_status "Created new orphan $BRANCH_NAME branch"
fi

# Copy build files to root
print_status "Copying build files..."
cp -r $BUILD_DIR/* .
cp -r $BUILD_DIR/.* . 2>/dev/null || true  # Copy hidden files if they exist

# Create .nojekyll file to prevent Jekyll processing
echo "" > .nojekyll

# Add CNAME file if it exists in the main branch
if git show $CURRENT_BRANCH:CNAME > /dev/null 2>&1; then
    git show $CURRENT_BRANCH:CNAME > CNAME
    print_status "CNAME file copied from main branch"
fi

# Add all files
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
    print_warning "No changes to deploy"
    git checkout $CURRENT_BRANCH
    exit 0
fi

# Commit changes
COMMIT_MESSAGE="Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$COMMIT_MESSAGE"

print_success "Changes committed: $COMMIT_MESSAGE"

# Push to GitHub
print_status "Pushing to GitHub Pages..."
git push origin $BRANCH_NAME --force

if [ $? -eq 0 ]; then
    print_success "Successfully deployed to GitHub Pages!"
else
    print_error "Failed to push to GitHub Pages"
    git checkout $CURRENT_BRANCH
    exit 1
fi

# Switch back to original branch
print_status "Switching back to $CURRENT_BRANCH branch..."
git checkout $CURRENT_BRANCH

# Clean up build directory (optional)
read -p "Clean build directory? (Y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Nn]$ ]]; then
    print_status "Keeping build directory"
else
    rm -rf $BUILD_DIR
    print_success "Build directory cleaned"
fi

print_success "🎉 Deployment completed successfully!"
print_status "Your site should be available at: https://$(git config user.name || echo 'your-username').github.io/$(basename $(git rev-parse --show-toplevel))"
echo
print_status "To configure GitHub Pages:"
print_status "1. Go to your repository settings on GitHub"
print_status "2. Navigate to 'Pages' section"
print_status "3. Select 'Deploy from a branch'"
print_status "4. Choose '$BRANCH_NAME' branch and '/ (root)' folder"
print_status "5. Save the configuration"
