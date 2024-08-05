from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel


class VidModel(SQLModel, table=True):
    """A virtual ID associated to an item for a specific user."""

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(index=True)
    item_id: UUID = Field(index=True)
