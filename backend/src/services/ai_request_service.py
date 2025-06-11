from abc import ABC, abstractmethod

class AiRequestService(ABC):
    @abstractmethod
    def request_query(self, question: str) -> dict:
        pass

    @abstractmethod
    def request_data_description(self, json_data: dict) -> str:
        pass