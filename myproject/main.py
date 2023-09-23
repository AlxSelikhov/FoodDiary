from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from api.connection import DATABASE_URL
from api.models import Calendar, Mealtime, Meal

app = FastAPI()

# Подключение к базе данных
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],
)

@app.get("/api")
def read_root():
    return [{"Hello": "World",
             "api": [{"name": "lol"}]}]



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

# Получение всех приемов пищи для указанного времени приема пищи
@app.get("/mealtime/{mealtime_id}/meal")
def get_meals(mealtime_id: int):
    Session = SessionLocal()
    mealtime = Session.query(Mealtime).get(mealtime_id)
    if mealtime:
        return mealtime.meals
    else:
        return []

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
@app.post("/mealtime/{mealtime_id}/meal")
def create_meal(mealtime_id: int, meal_name: str, grams: int, pieces: int):
    Session = SessionLocal()
    meal = Meal(mealtime_id=mealtime_id, meal_name=meal_name, grams=grams, pieces=pieces)
    Session.add(meal)
    Session.commit()
    Session.refresh(meal)
    return meal