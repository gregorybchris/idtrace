import logging
import uuid
from typing import Iterable, Optional
from uuid import UUID

from fastapi import APIRouter, HTTPException

from idtrace.app.vid_model import VidModel

logger = logging.getLogger(__name__)

router = APIRouter(tags=["vids"])


# async def app_state_dep() -> AppState:
#     """Application state dependency."""
#     return AppState.get()


# AppStateDep = Annotated[AppState, Depends(app_state_dep)]


@router.post("/users/{user_id}/item/{item_id}/vid")
async def create_vid(user_id: UUID, item_id: UUID) -> VidModel:
    """Create a new VID associating an item with a specific user."""
    vid = uuid.uuid4()
    vid_model = VidModel(user_id=user_id, item_id=item_id, vid=vid)

    return vid_model


@router.get("/users/{user_id}/item/{item_id}/vid")
async def get_vid(_user_id: UUID, _item_id: UUID) -> Optional[VidModel]:
    """Get VID for a user and item."""
    # TODO(chris): pull VID from database
    raise HTTPException(status_code=404, detail="VID not found")


@router.get("/vids")
async def get_vids() -> Iterable[VidModel]:
    """List all VIDs."""
    # TODO(chris): pull VIDs from database
    return []


@router.get("/users/{user_id}/vids")
async def get_user_vids(user_id: UUID) -> Iterable[VidModel]:
    """List VIDs for a user."""
    # TODO(chris): Pull VIDs from database
    raise HTTPException(status_code=404, detail=f"User {user_id} not found")


@router.get("/items/{item_id}/vids")
async def get_item_vids(item_id: UUID) -> Iterable[VidModel]:
    """List VIDs for an item."""
    # TODO(chris): Pull VIDs from database
    raise HTTPException(status_code=404, detail=f"Item {item_id} not found")
