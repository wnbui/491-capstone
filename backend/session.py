from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

import os

# Once we've established the database, its URL should go here
DATABASE_URL = os.getenv("DATABASE_URL", "lmao")

engine = create_engine(DATABASE_URL, echo = False)
Session = scoped_session(sessionmaker(bind=engine))