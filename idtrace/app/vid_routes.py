import logging
import uuid
from typing import Iterable, Optional
from uuid import UUID

from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select

from idtrace.app.db import DbDependency
from idtrace.app.vid_model import VidModel

logger = logging.getLogger(__name__)

router = APIRouter(tags=["vids"])


@router.post("/user/{user_id}/item/{item_id}/vid")
def post_vid(user_id: UUID, item_id: UUID, db: DbDependency) -> VidModel:
    """Create a new VID associating an item with a specific user."""
    vid_id = uuid.uuid4()
    vid = VidModel(id=vid_id, user_id=user_id, item_id=item_id)

    with Session(db.engine) as session:
        session.add(vid)
        session.commit()
        session.refresh(vid)

    return vid


@router.get("/user/{user_id}/item/{item_id}/vid")
def get_vid(user_id: UUID, item_id: UUID, db: DbDependency) -> Optional[VidModel]:
    """Get VID for a user and item."""
    with Session(db.engine) as session:
        vid = session.exec(select(VidModel).where(VidModel.user_id == user_id, VidModel.item_id == item_id)).first()
        if vid is None:
            raise HTTPException(status_code=404, detail="VID not found")
        return vid


@router.delete("/user/{user_id}/item/{item_id}/vid")
def delete_vid(user_id: UUID, item_id: UUID, db: DbDependency) -> Optional[VidModel]:
    """Delete VID for a user and item."""
    with Session(db.engine) as session:
        vid = session.exec(select(VidModel).where(VidModel.user_id == user_id, VidModel.item_id == item_id)).first()
        if vid is None:
            raise HTTPException(status_code=404, detail="VID not found")
        session.delete(vid)
        session.commit()
        return vid


@router.get("/vids")
def get_all_vids(db: DbDependency) -> Iterable[VidModel]:
    """List all VIDs."""
    with Session(db.engine) as session:
        return session.exec(select(VidModel)).all()


@router.get("/user/{user_id}/item/{item_id}/vids")
def get_vids(user_id: UUID, item_id: UUID, db: DbDependency) -> Iterable[VidModel]:
    """List VIDs for a user and item."""
    with Session(db.engine) as session:
        return session.exec(select(VidModel).where(VidModel.user_id == user_id, VidModel.item_id == item_id)).all()


@router.get("/user/{user_id}/vids")
def get_user_vids(user_id: UUID, db: DbDependency) -> Iterable[VidModel]:
    """List VIDs for a user."""
    with Session(db.engine) as session:
        return session.exec(select(VidModel).where(VidModel.user_id == user_id)).all()


@router.get("/item/{item_id}/vids")
def get_item_vids(item_id: UUID, db: DbDependency) -> Iterable[VidModel]:
    """List VIDs for an item."""
    with Session(db.engine) as session:
        return session.exec(select(VidModel).where(VidModel.item_id == item_id)).all()
