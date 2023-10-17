from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from api.connection import DATABASE_URL
from api.models import Calendar, Mealtime, Meal

app = FastAPI()

# Подключение к базе данных
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Маршруты для выполнения операций CRUD

# Получение всех календарей
@app.get("/calendar/{calendar_id}")
def get_calendar(calendar_id: int):
    Session = SessionLocal()
    calendar = Session.query(Calendar).get(calendar_id)
    return calendar

@app.get("/calendar")
def get_calendars():
    Session = SessionLocal()
    calendars = Session.query(Calendar).all()
    return calendars

# Получение всех времен приема пищи для указанного календаря
@app.get("/calendar/{calendar_id}/mealtime")
def get_mealtimes(calendar_id: int):
    Session = SessionLocal()
    calendar = Session.query(Calendar).get(calendar_id)
    if calendar:
        return calendar.mealtimes
    else:
        return []
    
@app.get("/mealtime")
def get_mealtimes():
    Session = SessionLocal()
    mealtime = Session.query(Mealtime).all()
    return mealtime

# Получение всех приемов пищи для указанного времени приема пищи
@app.get("/mealtime/{mealtime_id}/")
def get_mealtimes(mealtime_id: int):
    Session = SessionLocal()
    mealtime = Session.query(Mealtime).get(mealtime_id)
    if mealtime:
        return mealtime
    else:
        return []

@app.get("/mealtime/{mealtime_id}/meal")
def get_meals(mealtime_id: int):
    Session = SessionLocal()
    mealtime = Session.query(Mealtime).get(mealtime_id)
    if mealtime:
        return mealtime.meals
    else:
        return []
    
@app.get("/meal/{meal_id}")
def get_meals(meal_id: int):
    Session = SessionLocal()
    meals = Session.query(Meal).get(meal_id)
    if meals:
        return meals
    else:
        return []

@app.get("/meal")
def get_meals():
    Session = SessionLocal()
    meals = Session.query(Meal).all()
    return meals

# Создание нового календаря
@app.post("/calendar")
def create_calendar(calendar_name: str):
    Session = SessionLocal()
    calendar = Calendar(calendar_name=calendar_name)
    Session.add(calendar)
    Session.commit()
    Session.refresh(calendar)
    return calendar

# Создание нового времени приема пищи для указанного календаря
@app.post("/calendar/{calendar_id}/mealtime")
def create_mealtime(calendar_id: int, mealtime_name: str):
    Session = SessionLocal()
    mealtime = Mealtime(calendar_id=calendar_id, mealtime_name=mealtime_name)
    Session.add(mealtime)
    Session.commit()
    Session.refresh(mealtime)
    return mealtime

# Создание нового приема пищи для указанного времени приема пищи
class MealCreate(BaseModel):
    mealtime_id: int
    meal_name: str
    grams: Optional[int] = None
    pieces: Optional[int] = None

@app.post("/meal")
def create_meal(meal: MealCreate):
    Session = SessionLocal()
    meal_db = Meal(
        mealtime_id=meal.mealtime_id,
        meal_name=meal.meal_name,
        grams=meal.grams,
        pieces=meal.pieces
    )
    Session.add(meal_db)
    Session.commit()
    Session.refresh(meal_db)
    return {"message": "Meal created successfully", "meal_id": meal_db.id}