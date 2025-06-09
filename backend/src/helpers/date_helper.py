from datetime import datetime

def is_valid_datetime(date_string, date_format="%Y-%m-%d %H:%M:%S"):
    try:
        datetime.strptime(date_string, date_format)
        return True
    except ValueError:
        return False


def parse_date_string(date_string, date_format="%Y-%m-%d %H:%M:%S"):
    return datetime.strptime(date_string, date_format)