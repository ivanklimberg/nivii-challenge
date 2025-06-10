import os


def is_debug():
    return bool(os.environ.get('DEBUG', 'True'))

