# Use official Python slim image
FROM python:3.13-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/root/.local/bin:$PATH"

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install UV and pre-commit globally
RUN pip install --upgrade pip \
    && pip install uv pre-commit

# Copy dependency metadata
COPY pyproject.toml requirements.txt requirements-dev.txt uv.lock /app/

# Install Python dependencies
RUN uv sync --all-groups --frozen

# Copy all source code
COPY . /app/

# Make scripts executable
RUN chmod +x /app/entrypoint.sh  /app/migrate.sh

# Expose default port
EXPOSE 8000

# Start app
CMD ["sh", "/app/entrypoint.sh"]
