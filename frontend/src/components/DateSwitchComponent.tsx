import React, { useState } from "react";
import { DatePicker } from "antd";
// import "antd/dist/antd.css";

import "./style/DateSwitchStyle.css";

const DateSwitchComponent = () => {
  const [startDate, setStartDate] = useState(new Date());

  const handlePreviousWeek = () => {
    const previousWeekStartDate = new Date(startDate);
    previousWeekStartDate.setDate(startDate.getDate() - 7);
    setStartDate(previousWeekStartDate);
  };

  const handleNextWeek = () => {
    const nextWeekStartDate = new Date(startDate);
    nextWeekStartDate.setDate(startDate.getDate() + 7);
    setStartDate(nextWeekStartDate);
  };

  const renderWeekDates = () => {
    const weekDates = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      weekDates.push(date);
    }

    return weekDates.map((date) => (
      <div key={date.toISOString()} className="date-card">
        <div className="date">{date.getDate()}</div>
        <div className="month">
          {date.toLocaleString("en-US", { month: "short" })}
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="container">
        <div className="month-year">
          {startDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <div className="date-picker-container">
          <DatePicker />
        </div>
      </div>
      <div className="calendar-panel">
        <div className="button-container">
          <div className="button" onClick={handlePreviousWeek}>
            <div className="button-arrow"></div>
          </div>
          <div className="week-dates">{renderWeekDates()}</div>
          <div className="button" onClick={handleNextWeek}>
            <div
              className="button-arrow"
              style={{ transform: "rotate(-135deg)" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DateSwitchComponent;
