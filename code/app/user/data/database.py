import os
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

database_url = os.getenv('DATABASE_URL')

# Crear el engine con la URL de la base de datos
engine = create_engine(database_url)
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()
Base.query = db_session.query_property()
