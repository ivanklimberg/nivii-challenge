from flask import json
from src.services.db_access_service import DbAccessService


class QuestionHistoryRepository():
    def __init__(self):
        self.db_access_service = DbAccessService()

    def insert_question_history(
        self,
        question: str, 
        succesful_response: bool, 
        json_response: dict|None = None,
        description: str|None = None,
        chart_type: str|None = None):
        insert_statement = 'INSERT INTO question_history (question, succesful_response, json_response, description, chart_type) VALUES (%s, %s, %s, %s, %s)'

        self.db_access_service.run_non_query(insert_statement, (question, 1 if succesful_response else 0, json.dumps(json_response), description, chart_type))
    
    def get_question_history(self, page: int = 1, page_size: int = 20):
        start = (page - 1) * page_size
        query = f"""
            SELECT 
                id, question, succesful_response, json_response, description, chart_type, created_at 
            FROM question_history 
            ORDER BY created_at DESC
            LIMIT {page_size} OFFSET {start}
        """

        return_data = self.db_access_service.run_query(query)

        return return_data