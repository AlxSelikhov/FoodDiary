import React, { useState, useEffect } from "react";
import axios from "axios";

import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import "./style/GlobalStyle.css";
import DateSwitchComponent from "../components/DateSwitchComponent";

const Schedulepage: React.FC = () => {
  const [mealtime, setMealtime] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/mealtimes/")
      .then((response) => {
        setMealtime(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="body">
      <div className="content">
        <HeaderComponent />
        <DateSwitchComponent />
        <div className="mealtime-container">
          {mealtime.map((mealtime: any) => (
            <div className="mealtime-card" key={mealtime.id}>
              <div className="mealtime-name">{mealtime.name}</div>
              <button className="add-button">&#43;</button>
            </div>
          ))}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default Schedulepage;