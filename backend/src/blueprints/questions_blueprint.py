from flask import Blueprint, request, session

from src.helpers.request_validation_helper import validate_request
from src.config.contants import DATABASE_STRUCTURE
from src.services.chat_gpt_request_service import ChatGPTRequestService


questions_blueprint = Blueprint('questions_blueprint', __name__)
ai_request_service = ChatGPTRequestService(DATABASE_STRUCTURE)


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