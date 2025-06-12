import logging.config
import os
import threading
import time
import uuid
import structlog
from structlog.contextvars import bind_contextvars, merge_contextvars

def logger_bind_contextvars():
    """
    Add app_type, app_name, execution_id and thread_name parameters to each log that use the logger from this module.
    Because its context is local, it must be called not only in the start of the app but also
    inside each new thread
    """
    if os.environ.get('EXECUTION_ID') is None:
        os.environ['EXECUTION_ID'] = str(uuid.uuid4())
    bind_contextvars(
        app_name=os.environ.get('APP_NAME'),
        execution_id=os.environ.get('EXECUTION_ID'),
        thread_name=threading.current_thread().name,
    )

def app_handler_decorator_log(func):
    """
    Decorator that log the execution time of the decorated function
    Should be used only for the main function
    To use it just import it and add "@app_handler_decorator_log" above the function declaration
    """
    def wrapper(*args, **kwargs):
        t = time.perf_counter()
        func(*args, **kwargs)
        elapsed_time = time.perf_counter() - t
        logger.info('execution time event', execution_time=elapsed_time)

    return wrapper

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'root': {
        'level': os.environ.get('LOG_LEVEL', 'INFO'),
        'handlers': ['console'],
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        }
    },
    'loggers': {
        'openai': {
            'level': 'WARNING',
            'handlers': ['console'],
            'propagate': False 
        },
        'httpx': {
            'level': 'WARNING',
            'handlers': ['console'],
            'propagate': False
        },
        'httpcore': {
            'level': 'WARNING',
            'handlers': ['console'],
            'propagate': False
        }
    }
}

logging.config.dictConfig(LOGGING)

# Configure structlog
structlog.configure(
    processors=[
        merge_contextvars,
        structlog.processors.add_log_level,
        structlog.processors.format_exc_info,
        structlog.processors.StackInfoRenderer(),
        structlog.processors.UnicodeDecoder(),
        structlog.processors.JSONRenderer()
    ],
    wrapper_class=structlog.stdlib.BoundLogger,
    logger_factory=structlog.stdlib.LoggerFactory(),
)

# Create and configure logger instance
logger = structlog.getLogger()
logger_bind_contextvars() 