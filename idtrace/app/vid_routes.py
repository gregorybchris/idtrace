import logging
import uuid
from typing import Iterable, Optional
from uuid import UUID

from fastapi import APIRouter, HTTPException

from idtrace.app.vid_model import VidModel

logger = logging.getLogger(__name__)

router = APIRouter(tags=["vids"])


@router.post(
    "/users/{user_id}/item/{item_id}/vid",
    response_description="Update a user",
    response_model=VidModel,
    response_model_by_alias=False,
)
async def create_vid(user_id: UUID, item_id: UUID) -> VidModel:
    """Create a new VID associating an item with a specific user."""
    user_found = False
    if not user_found:
        raise HTTPException(status_code=404, detail=f"User {user_id} not found")

    # TODO(chris): Save VID to database

    vid = uuid.uuid4()
    return VidModel(user_id=user_id, item_id=item_id, id=vid)


@router.get(
    "/users/{user_id}/item/{item_id}/vid",
    response_description="Get a VID associated with an user and a item",
    response_model=VidModel,
    response_model_by_alias=False,
)
async def get_vid(_user_id: UUID, _item_id: UUID) -> Optional[VidModel]:
    """Get vid for a user and item."""
    # TODO(chris): pull VID from database
    raise HTTPException(status_code=404, detail="VID not found")


@router.get(
    "/vids",
    response_description="List all VIDs",
    response_model=Iterable[VidModel],
    response_model_by_alias=False,
)
async def get_vids() -> Iterable[VidModel]:
    """List all VIDs."""
    # TODO(chris): pull VIDs from database
    return []


@router.get(
    "/users/{user_id}/vids",
    response_description="List VIDs for a user",
    response_model=Iterable[VidModel],
    response_model_by_alias=False,
)
async def get_user_vids(user_id: UUID) -> Iterable[VidModel]:
    """List VIDs for a user."""
    # TODO(chris): Pull VIDs from database
    raise HTTPException(status_code=404, detail=f"User {user_id} not found")


@router.get(
    "/items/{item_id}/vids",
    response_description="List VIDs for an item",
    response_model=Iterable[VidModel],
    response_model_by_alias=False,
)
async def get_item_vids(item_id: UUID) -> Iterable[VidModel]:
    """List VIDs for an item."""
    # TODO(chris): Pull VIDs from database
    raise HTTPException(status_code=404, detail=f"Item {item_id} not found")
