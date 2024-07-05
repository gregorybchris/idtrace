import logging

from fastapi import APIRouter
from pydantic import BaseModel

from idtrace import __version__ as package_version

logger = logging.getLogger(__name__)

router = APIRouter(tags=["service"])


class GetStatusResponse(BaseModel):
    """Response model for getting the API status."""

    status: str


@router.get(name="Status", path="/", description="Get the API status.")
def get_status() -> GetStatusResponse:
    """Get the API status."""
    return GetStatusResponse(status="healthy")


class GetVersionResponse(BaseModel):
    """Response model for getting the API version."""

    version: str


@router.get(name="Version", path="/version", description="Get the API version.")
def get_version() -> GetVersionResponse:
    """Get the API version."""
    return GetVersionResponse(version=package_version)
