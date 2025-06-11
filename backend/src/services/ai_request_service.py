from abc import ABC, abstractmethod

class AiRequestService(ABC):
    @abstractmethod
    def request_query(self, question: str) -> dict:
        pass