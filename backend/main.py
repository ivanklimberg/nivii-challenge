import os
import sys
from dotenv import load_dotenv

# Load environment variables first
load_dotenv()
from src.config.config import is_debug
from src.config.logger_config import logger_bind_contextvars, logger

import flask
import werkzeug
from flask import Flask, request, jsonify
from flask_cors import CORS

from src.blueprints.questions_blueprint import questions_blueprint
from src.blueprints.questions_history_blueprint import questions_history_blueprint


logger_bind_contextvars()
logger.info('Starting application')


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True, allow_headers="*", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

app.register_blueprint(questions_blueprint, url_prefix='/questions')
app.register_blueprint(questions_history_blueprint, url_prefix='/questions/history')

@app.before_request
def log_request_info():
    logger_bind_contextvars()
    logger.info(f"{request.method} {request.path}")

@app.errorhandler(Exception)
def error_handler(e: werkzeug.exceptions):
    logger.error(e)
    
    if is_debug():
        import traceback
        logger.error(traceback.format_exc())

    return jsonify(success=False, message=str(e))

@app.route("/")
def get_index():
    return {
        'success': True,
        'message': 'Up and running!'
    }, 200


app.run(host='0.0.0.0', port=5000)

