from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class VidModel(BaseModel):
    """A virtual ID associated to an item for a specific user."""

    id: UUID = Field(default_factory=uuid4)
    user_id: UUID
    item_id: UUID
