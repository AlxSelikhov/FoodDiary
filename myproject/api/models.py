from sqlalchemy import create_engine, Column, Date, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base

from api.connection import DATABASE_URL

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Модели данных
class Calendar(Base):
    __tablename__ = "calendar"

    id = Column(Integer, primary_key=True, index=True)
    calendar_name = Column(Date)

    mealtimes = relationship("Mealtime", back_populates="calendar")

class Mealtime(Base):
    __tablename__ = "mealtime"

    id = Column(Integer, primary_key=True, index=True)
    calendar_id = Column(Integer, ForeignKey("calendar.id"))
    mealtime_name = Column(String)

    calendar = relationship("Calendar", back_populates="mealtimes")
    meals = relationship("Meal", back_populates="mealtime")

class Meal(Base):
    __tablename__ = "meal"

    id = Column(Integer, primary_key=True, index=True)
    mealtime_id = Column(Integer, ForeignKey("mealtime.id"))
    meal_name = Column(String)
    grams = Column(Integer)
    pieces = Column(Integer)

    mealtime = relationship("Mealtime", back_populates="meals")
    
# Создание таблиц
Base.metadata.create_all(bind=engine)