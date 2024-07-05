import logging

from fastapi import FastAPI

from idtrace.app.service_routes import router as service_router
from idtrace.app.vid_routes import router as vid_router

logger = logging.getLogger(__name__)


app = FastAPI()


app = FastAPI(
    title="idtrace API",
    summary="Understand your users with personalized identifiers.",
)

app.include_router(service_router)
app.include_router(vid_router)
