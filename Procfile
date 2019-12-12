web: gunicorn repositories_monitor.wsgi --chdir backend --limit-request-line 8188 --log-file -
worker: celery worker --workdir backend --app=repositories_monitor --loglevel=info
