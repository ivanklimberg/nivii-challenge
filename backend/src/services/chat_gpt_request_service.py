import os
from flask import json
from openai import OpenAI

from src.services.ai_request_service import AiRequestService

from src.config.logger_config import logger

class ChatGPTRequestService(AiRequestService):
    def __init__(self, database_structure_string: str):
        self.database_structure_string = database_structure_string
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    def get_basic_question_system_prompt(self):
        return f"""
            You are an assistant that translates user questions into MySQL queries based on the provided database schema:

            {self.database_structure_string}

            Your response must be a valid **raw JSON object** in the following format (without markdown or formatting):

            {{
                "query": "string",
                "response_display_type": "pie" | "bar" | "line" | "table" | "none",
                "config": {{
                    "x": "column_name",
                    "y": "column_name",
                    "series": "column_name"  // only required for multiline charts
                }}
            }}

            Instructions:
            - The `query` field must be a valid MySQL query that answers the user's question.
            - You may use SQL functions (e.g., `SUM(...)`, `MONTH(...)`), but in the `"config"` field, **only use the column aliases returned by the query**, not raw expressions.
            - Choose the most appropriate `response_display_type` for visualizing the result.
            - Return **only raw JSON** — do not include markdown formatting, triple backticks, newlines, or explanations.
            - Your output must be directly usable by Python's `json.loads()` function.
        """

    def request_query(self, question: str):
        model = 'gpt-4o'
        logger.info(f'Making request to chat-gpt model {model} for question')
        response = self.client.chat.completions.create(
            model=model,  # or "gpt-3.5-turbo"
            messages=[
                { "role": "system", "content": self.get_basic_question_system_prompt() },
                { "role": "user", "content": f"Question: {question}"}
            ]
        )
        logger.info(f'Request from question to chat-gpt model {model} was succesful.', question=question)

        response_content = response.choices[0].message.content.strip()

        logger.debug('Question Response', response_content=response_content)

        response_content = json.loads(response_content)

        if not response_content['query']:
            raise Exception(f'The question did not return a valid query')

        return response_content