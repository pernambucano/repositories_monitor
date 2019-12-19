web: cd backend && daphne repositories_monitor.asgi:application --port $PORT --bind 0.0.0.0 -v2 
worker: cd backend && python manage.py runworker -v2 