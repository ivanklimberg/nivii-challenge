from flask import Blueprint, request

from src.helpers.request_validation_helper import validate_request
from src.config.contants import DATABASE_STRUCTURE
from src.services.chat_gpt_request_service import ChatGPTRequestService
from src.services.db_access_service import DbAccessService


questions_blueprint = Blueprint('questions_blueprint', __name__)
ai_request_service = ChatGPTRequestService(DATABASE_STRUCTURE)
db_access_service = DbAccessService()


POST_QUESTIONS_MANDATORY_FIELD = {
    'question': str
}

@questions_blueprint.route("", methods=["POST"])
def post_question():
    data = request.get_json()

    validation_result = validate_request(data, POST_QUESTIONS_MANDATORY_FIELD)
    if not validation_result['success']:
        return validation_result, 400

    response_query = ai_request_service.request_query(data['question'])

    result_data = db_access_service.run_query(response_query.query)

    return {
        'success': True,
        'display_type': response_query.response_display_type,
        'data': result_data
    }