from flask import Blueprint, request

from src.services.question_history_repository import QuestionHistoryRepository

questions_history_blueprint = Blueprint('questions_history_blueprint', __name__)
questions_history_repository = QuestionHistoryRepository()


@questions_history_blueprint.route("", methods=["GET"])
def get_question_history():
    page = int(request.args.get('page', 1))
    page_size = int(request.args.get('page_size', 20))

    question_history_data = questions_history_repository.get_question_history(page, page_size)

    return {
        'success': True,
        'data': question_history_data,
        'page': page,
        'page_size': page_size
    }

@questions_history_blueprint.route("<int:id>", methods=["GET"])
def get_question_history_by_id(id: int):

    question_history = questions_history_repository.get_question_history_by_id(id)

    if not question_history:
        return {
            'success': False,
            'message': 'Not found'
        }, 404

    return {
        'success': True,
        'data': question_history,
    }