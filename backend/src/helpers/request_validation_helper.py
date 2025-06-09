from datetime import datetime
from src.helpers.date_helper import is_valid_datetime


def validate_request(request_params: dict, mandatory_fields: dict):
    valid_request = True
    error_fields = ''
    for key, value in mandatory_fields.items():
        if not request_params.get(key):
            valid_request = False
            error_fields += f'Missing {key}, '
            continue    

        if value == datetime:
            valid_request = is_valid_datetime(request_params[key])
            if not valid_request:
                error_fields += f'Wrong Type {key}: Correct type {value}, '
            continue
            
        
        if type(request_params[key]) != value:
            valid_request = False
            error_fields += f'Wrong Type {key}: Correct type {value}, '
            continue
    
    message = ''
    if valid_request:
        message = 'Request is valid'
    else:
        error_fields = error_fields[:-2]
        message = f'Errors on request validation - {error_fields}'

    return {
        'success': valid_request,
        'message': message
    }
