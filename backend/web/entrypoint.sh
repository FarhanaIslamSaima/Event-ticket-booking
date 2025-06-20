#!/bin/bash
set -x

# echo "Applying database migrations..."
# uv run python manage.py migrate --noinput

# echo "Collecting static files..."
# uv run python manage.py collectstatic --noinput

echo "Starting Gunicorn server..."
uv run gunicorn config.wsgi:application \
    --chdir src \
    --bind 0.0.0.0:${PORT:-8000} \
    --workers 3 \
    --threads 2 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile -
