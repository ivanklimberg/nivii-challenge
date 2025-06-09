import os
import sys
from dotenv import load_dotenv

# Load environment variables first
load_dotenv()
from src.services.chat_gpt_request_service import ChatGPTRequestService
from logger_config import logger_bind_contextvars, logger

import flask
import werkzeug
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

logger_bind_contextvars()
logger.info('Starting application')

service = ChatGPTRequestService('''
    CREATE TABLE orders(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        date DATE NOT NULL,
        week_day VARCHAR(12) NOT NULL,
        hour TIME NOT NULL,
        ticket_number VARCHAR(25) NOT NULL,
        waiter INT NOT NULL DEFAULT 0,
        product_name VARCHAR(120) NOT NULL,
        quantity INT NOT NULL,
        unitary_price NUMERIC(14,2) NOT NULL,
        total NUMERIC(14,2) NOT NULL
    );

''')

response = service.request_query('Get me the top 5 products that historically got us bigger revenue')
logger.info(response.query)