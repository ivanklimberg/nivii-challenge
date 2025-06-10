import os
import mysql.connector


class DbAccessService():
    def __init__(self):
        self.db_user = os.environ['DB_USER']
        self.db_password = os.environ['DB_PASSWORD']
        self.db_port = os.environ.get('DB_PORT', 3306)
        self.db_host = os.environ.get('DB_HOST', 'localhost')
        self.database = os.environ.get('DATABASE', 'nivii_challenge')

    def run_query(self, query: str):
        connection = mysql.connector.connect(
            user=self.db_user, 
            password=self.db_password, 
            host=self.db_host,
            port=self.db_port,
            database=self.database)
        
        with connection.cursor() as cursor:
            cursor.execute(query)

            results = self.__cursor_to_dict_list(cursor)

        connection.close()

        return results


    def __cursor_to_dict_list(self, cursor):
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]