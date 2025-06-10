import os
from flask import json
from openai import OpenAI

from src.models.request_query_response import RequestQueryResponse
from src.services.ai_request_service import AiRequestService

from src.config.logger_config import logger

class ChatGPTRequestService(AiRequestService):
    def __init__(self, database_structure_string: str):
        self.database_structure_string = database_structure_string
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    def get_system_prompt(self):
        return f"""
            You are an assistant that translates user questions into SQL queries based on the provided schema:
            {self.database_structure_string}
            Return me a MySQL query to get the necessary data to answer the question. Also do it with the following JSON schema:
            {json.dumps({ 'query': 'string', 'response_display_type': 'pie' }, indent=2)}
            You also choose the best way to visualize the results using one of: pie, bar, line, table, none.
            Only respond with raw JSON. Do not include explanations, markdown formatting, or extra characters.
            Your output must be directly parsable by Python's json.loads().
        """


    def request_query(self, question: str):
        model = 'gpt-4o'
        logger.info(f'Making request to chat-gpt model {model}')
        response = self.client.chat.completions.create(
            model=model,  # or "gpt-3.5-turbo"
            messages=[
                { "role": "system", "content": self.get_system_prompt() },
                { "role": "user", "content": f"Question: {question}"}
            ]
        )
        logger.info(f'Request from question {question} to chat-gpt model {model} was succesful.')

        response_content = response.choices[0].message.content.strip()
        response_content = json.loads(response_content)

        if not response_content['query']:
            raise Exception(f'The question did not return a valid query')
        

        return RequestQueryResponse(response_content['response_display_type'], response_content['query'])