VENV_DIR := .venv

# Check if uv is installed globally
ifeq ($(OS),Windows_NT)
	UV_GLOBAL := $(shell where uv 2>nul || echo not_found)
else
	UV_GLOBAL := $(shell which uv 2>/dev/null || echo not_found)
endif

ifeq ($(OS),Windows_NT)
	PYTHON := $(VENV_DIR)/Scripts/python.exe
	PIP := $(VENV_DIR)/Scripts/pip.exe
	UV := $(VENV_DIR)/Scripts/uv.exe
	BLACK := $(VENV_DIR)/Scripts/black.exe
	ISORT := $(VENV_DIR)/Scripts/isort.exe
	FLAKE8 := $(VENV_DIR)/Scripts/flake8.exe
	MYPY := $(VENV_DIR)/Scripts/mypy.exe
	PRECOMMIT := $(VENV_DIR)/Scripts/pre-commit.exe
	# Windows-specific commands
	CHECK_VENV := if exist $(VENV_DIR) (echo Virtual environment already exists. Use 'make clean-venv' to remove it first.) else (echo Creating virtual environment... && python -m venv $(VENV_DIR) && echo Run '.\\$(VENV_DIR)\\Scripts\\activate' to activate.)
	RM_CMD := rmdir /s /q
	FIND_PYC := del /s /q *.pyc 2>nul || echo No .pyc files found
	FIND_PYCACHE := for /d /r . %%d in (__pycache__) do @if exist "%%d" rd /s /q "%%d" 2>nul || echo No __pycache__ directories found
else
	PYTHON := $(VENV_DIR)/bin/python
	PIP := $(VENV_DIR)/bin/pip
	UV := $(VENV_DIR)/bin/uv
	BLACK := $(VENV_DIR)/bin/black
	ISORT := $(VENV_DIR)/bin/isort
	FLAKE8 := $(VENV_DIR)/bin/flake8
	MYPY := $(VENV_DIR)/bin/mypy
	PRECOMMIT := $(VENV_DIR)/bin/pre-commit
	# Unix-specific commands
	CHECK_VENV := if [ -d $(VENV_DIR) ]; then echo "Virtual environment already exists. Use 'make clean-venv' to remove it first."; else echo "Creating virtual environment..."; python -m venv $(VENV_DIR); echo "Run 'source $(VENV_DIR)/bin/activate' to activate."; fi
	RM_CMD := rm -rf
	FIND_PYC := find . -name "*.pyc" -delete
	FIND_PYCACHE := find . -name "__pycache__" -type d -exec rm -rf {} +
endif

DJANGO_SETTINGS := config.settings
export DJANGO_SETTINGS_MODULE := $(DJANGO_SETTINGS)

.PHONY: help venv install sync update-reqs add-pkg add-dev-pkg server shell test migrations makemigrations createsuperuser format lint check clean-venv clean-pyc install-uv

help:
	@echo "Available commands:"
	@echo "  venv              Create a new virtual environment"
	@echo "  install-uv        Install UV package manager"
	@echo "  install           Install all dependencies and pre-commit hooks"
	@echo "  sync              Sync dependencies using uv (if available)"
	@echo "  update-reqs       Update requirements files from current environment"
	@echo "  add-pkg           Add a package (make add-pkg PACKAGE=name)"
	@echo "  add-dev-pkg       Add a dev package (make add-dev-pkg PACKAGE=name)"
	@echo "  server            Run the development server"
	@echo "  shell             Run Django shell"
	@echo "  test              Run tests"
	@echo "  migrations        Run migrations"
	@echo "  makemigrations    Make migrations"
	@echo "  createsuperuser   Create a superuser"
	@echo "  format            Format code with black and isort"
	@echo "  lint              Lint code with flake8 and mypy"
	@echo "  check             Check formatting and linting"
	@echo "  clean-venv        Remove virtual environment"
	@echo "  clean-pyc         Remove Python cache files"

venv:
	@$(CHECK_VENV)

install-uv:
	@echo "Installing UV package manager..."
	@$(PIP) install uv

install: venv
ifeq ($(UV_GLOBAL),not_found)
	@echo "UV not found. Installing packages with pip..."
	@$(PIP) install -r requirements.txt
	@$(PIP) install -r requirements-dev.txt
	@$(PIP) install pre-commit
	@$(PRECOMMIT) install
else
	@echo "Installing packages with UV..."
	@$(PIP) install uv
	@$(UV) pip install -r requirements.txt
	@$(UV) pip install -r requirements-dev.txt
	@$(PRECOMMIT) install
endif

sync:
ifeq ($(UV_GLOBAL),not_found)
	@echo "UV not found. Please install UV first with 'make install-uv'"
else
	@$(UV) pip sync requirements.txt requirements-dev.txt
endif

update-reqs:
	@$(PYTHON) -m pip freeze > requirements.freeze.txt

add-pkg:
ifeq ($(OS),Windows_NT)
	@if not defined PACKAGE (echo Error: PACKAGE variable not set & exit /b 1)
else
	@test -n "$(PACKAGE)" || (echo "Error: PACKAGE variable not set"; exit 1)
endif
ifeq ($(UV_GLOBAL),not_found)
	@$(PIP) install $(PACKAGE)
else
	@$(UV) pip install $(PACKAGE)
endif
	@echo $(PACKAGE) >> requirements.txt

add-dev-pkg:
ifeq ($(OS),Windows_NT)
	@if not defined PACKAGE (echo Error: PACKAGE variable not set & exit /b 1)
else
	@test -n "$(PACKAGE)" || (echo "Error: PACKAGE variable not set"; exit 1)
endif
ifeq ($(UV_GLOBAL),not_found)
	@$(PIP) install $(PACKAGE)
else
	@$(UV) pip install $(PACKAGE)
endif
	@echo $(PACKAGE) >> requirements-dev.txt

server:
	@$(PYTHON) manage.py runserver

shell:
	@$(PYTHON) manage.py shell

test:
	@$(PYTHON) -m pytest

migrations:
	@$(PYTHON) manage.py migrate

makemigrations:
	@$(PYTHON) manage.py makemigrations

createsuperuser:
	@$(PYTHON) manage.py createsuperuser

format:
	@$(BLACK) .
	@$(ISORT) .

lint:
	@$(FLAKE8) .
	@$(MYPY) .

check:
	@$(BLACK) . --check
	@$(ISORT) . --check
	@$(FLAKE8) .
	@$(MYPY) .

clean-venv:
	@$(RM_CMD) $(VENV_DIR)

clean-pyc:
	@$(FIND_PYC)
	@$(FIND_PYCACHE)
