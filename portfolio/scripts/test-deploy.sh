#!/bin/bash

# Quick test script to validate the deploy functionality

echo "🧪 Testing deploy script functionality..."

# Test 1: Help function
echo "📖 Testing help function..."
if ./scripts/deploy-gh-pages.sh --help >/dev/null 2>&1; then
    echo "✅ Help function works"
else
    echo "❌ Help function failed"
fi

# Test 2: Syntax check
echo "🔍 Checking script syntax..."
if bash -n scripts/deploy-gh-pages.sh; then
    echo "✅ Script syntax is valid"
else
    echo "❌ Script has syntax errors"
    exit 1
fi

# Test 3: Basic environment check
echo "🌍 Testing environment validation..."
if cd /tmp && git init test-repo && cd test-repo && git remote add origin git@github.com:example/test.git; then
    echo "✅ Basic git environment works"
    cd '/srv/apps/kubex-ecosystem/rafa-mori' || exit 1
    rm -rf /tmp/test-repo
else
    echo "❌ Git environment test failed"
fi

echo "🎉 Basic tests completed!"
