web: daphne repositories_monitor.asgi:application --port $PORT --bind 0.0.0.0 -v2 --chdir backend
worker: python manage.py runworker -v2 --workdir backend --app=repositories_monitor --loglevel=info