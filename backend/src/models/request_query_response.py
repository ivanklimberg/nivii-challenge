from dataclasses import dataclass
from typing import Literal

@dataclass
class RequestQueryResponse:
    response_display_type: Literal["pie", "bar", "line", "table", "none"]
    query: str