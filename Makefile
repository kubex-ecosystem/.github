# Makefile for rafa-mori
# =====================
# Centralization of workflows for development, testing, and distribution

.PHONY: help install install-dev install-ai test test-fast lint format clean build publish dev-setup

# Define the application name and root directory
APP_NAME := rafa-mori
APP_ALIAS := Rafa Mori
ROOT_DIR := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
CMD_DIR := $(ROOT_DIR)src

SRC_DIR := src
DIST_DIR := out
PACKAGE_NAME := $(APP_NAME)

# Define the color codes
COLOR_GREEN := \033[32m
COLOR_YELLOW := \033[33m
COLOR_RED := \033[31m
COLOR_BLUE := \033[34m
COLOR_RESET := \033[0m

# Logging Functions
log = @printf "%b%s%b %s\n" "$(COLOR_BLUE)" "[LOG]" "$(COLOR_RESET)" "$(1)"
log_info = @printf "%b%s%b %s\n" "$(COLOR_BLUE)" "[INFO]" "$(COLOR_RESET)" "$(1)"
log_success = @printf "%b%s%b %s\n" "$(COLOR_GREEN)" "[SUCCESS]" "$(COLOR_RESET)" "$(1)"
log_warning = @printf "%b%s%b %s\n" "$(COLOR_YELLOW)" "[WARNING]" "$(COLOR_RESET)" "$(1)"
log_break = @printf "%b%s%b\n" "$(COLOR_BLUE)" "[INFO]" "$(COLOR_RESET)"
log_error  = @printf "%b%s%b %s\n" "$(COLOR_RED)" "[ERROR]" "$(COLOR_RESET)" "$(1)"

ARGUMENTS := $(MAKECMDGOALS)
MAIN_SCRIPT=$(ROOT_DIR)support/project-manager.sh
TEST_SCRIPT=$(ROOT_DIR)support/tests-gh-pages.sh.sh
CMD_STR := $(strip $(firstword $(ARGUMENTS)))
ARGS := $(filter-out $(strip $(CMD_STR)), $(ARGUMENTS))

# Default help
help:
	$(call log_info,"$(APP_NAME) - Available Commands")
	@echo "===================================="
	@echo ""
	@echo "📦 Installation:"
	@echo "  start      - Deploy the project in production mode"
	@echo "  start-dev  - Deploy the project in development mode"
	@echo ""
	@echo "🧪 Testing:"
	@echo "  test         - Run all tests"
	@echo "  test-fast    - Run quick tests"
	@echo ""
	@echo "🔧 Development:"
	@echo "  structure    - Check project structure"
	@echo "  lint         - Check code with linting"
	@echo "  format       - Format code"
	@echo "  clean        - Clean temporary files"
	@echo ""
	@echo "🚀 Distribution:"
	@echo "  build        - Build all the project without publishing"
	@echo "  publish      - Deploy1 the project to GitHub Pages in production mode"
	@echo ""
	@echo "💡 Examples:"
	@echo "  make start-dev && make test"
	@echo "  make build && make publish"

# Start in production mode locally
start:
	@$(MAIN_SCRIPT) start

# Run the project in development mode locally
start-dev:
	@$(MAIN_SCRIPT) start-dev

# Run all tests
test:
	@$(MAIN_SCRIPT) test-full

# Run quick tests
test-fast:
	@$(MAIN_SCRIPT) test

# Code linting
lint:
	@$(MAIN_SCRIPT) lint

# Code formatting
format:
	@$(MAIN_SCRIPT) format

# Clean temporary files
clean:
	@$(MAIN_SCRIPT) clean

# Build the project without publishing
build:
	@$(MAIN_SCRIPT) build

# Publish to GitHub Pages
publish:
	@$(MAIN_SCRIPT) publish

# Check project structure
check-structure:
	@$(MAIN_SCRIPT) structure

# Alias for structure command
structure: check-structure

