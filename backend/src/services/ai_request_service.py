from abc import ABC, abstractmethod
from src.models.request_query_response import RequestQueryResponse

class AiRequestService(ABC):
    @abstractmethod
    def request_query(self, question: str) -> RequestQueryResponse:
        pass