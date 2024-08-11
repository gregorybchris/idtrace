from dataclasses import dataclass
from typing import Annotated

from fastapi import Depends
from sqlalchemy import Engine
from sqlmodel import SQLModel, create_engine


@dataclass
class Db:
    """Database."""

    engine: Engine


def db_dependency() -> Db:
    """Database dependency.

    Returns:
        Db: An instance of an application database connection.
    """
    sqlite_file_name = "database.db"
    sqlite_url = f"sqlite:///{sqlite_file_name}"

    connect_args = {"check_same_thread": False}
    engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)
    SQLModel.metadata.create_all(engine)

    return Db(engine=engine)


DbDependency = Annotated[Db, Depends(db_dependency)]
