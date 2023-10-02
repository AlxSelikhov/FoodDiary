import React, { useEffect, useState } from "react";
import axios from "axios";

interface CalendarItem {
  id: number;
  calendar_name: string;
  date: string;
}

interface MealTimesItem {
  calendar_id: number;
  id: number;
  mealtime_name: string;
}

function WeekListComponent() {
  const [calendarData, setCalendarData] = useState<CalendarItem[]>([]);
  const [currentWeekData, setCurrentWeekData] = useState<CalendarItem[]>([]);
  const [mealTimes, setMealTimes] = useState<MealTimesItem[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<CalendarItem[]>(
        "http://127.0.0.1:8000/calendar"
      );
      setCalendarData(response.data);
      const currentDate = new Date();
      const currentWeekDates = getWeekDates(currentDate);
      const currentWeekData = response.data.filter((item) =>
        currentWeekDates.includes(item.calendar_name)
      );
      setCurrentWeekData(currentWeekData);
      fetchMealTimes(currentWeekData[0].id);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMealTimes = async (date: number) => {
    try {
      const response = await axios.get<MealTimesItem[]>(
        `http://127.0.0.1:8000/calendar/${date}/mealtime`
      );
      setMealTimes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getWeekDates = (currentDate: Date): string[] => {
    const weekDates: string[] = [];
    const firstDayOfWeek = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
    );
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(date.getDate() + i);
      weekDates.push(date.toISOString().split("T")[0]);
    }
    return weekDates;
  };

  const handleNextWeek = () => {
    const nextWeekDate = new Date(currentWeekData[0].calendar_name);
    nextWeekDate.setDate(nextWeekDate.getDate() + 7);
    setCurrentWeekData(
      calendarData.filter((item) =>
        getWeekDates(nextWeekDate).includes(item.calendar_name)
      )
    );
    fetchMealTimes(getWeekDates(nextWeekDate)[0]);
  };

  const handlePreviousWeek = () => {
    const previousWeekDate = new Date(currentWeekData[0].calendar_name);
    previousWeekDate.setDate(previousWeekDate.getDate() - 7);
    setCurrentWeekData(
      calendarData.filter((item) =>
        getWeekDates(previousWeekDate).includes(item.calendar_name)
      )
    );
    fetchMealTimes(getWeekDates(previousWeekDate)[0]);
  };

  return (
    <>
      <div>
        <button onClick={handlePreviousWeek}>Предыдущая неделя</button>
        <button onClick={handleNextWeek}>Следующая неделя</button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {currentWeekData.map((item: CalendarItem) => (
          <div key={item.id} style={{ marginRight: "10px" }}>
            <button onClick={() => fetchMealTimes(item.id)}>
              {item.calendar_name}
            </button>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {mealTimes.map((meal: MealTimesItem) => (
          <div key={meal.id} style={{ marginBottom: "10px" }}>
            {currentWeekData.some((item) => item.id === meal.calendar_id) && (
              <div>
                <p style={{ fontWeight: "bold" }}>{meal.mealtime_name}</p>
                <button style={{ margin: "10px 0" }}>Добавить блюдо</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default WeekListComponent;
