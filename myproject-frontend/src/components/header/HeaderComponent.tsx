import React from "react";
import "./HeaderStyle.css";

function HeaderComponent() {
  return (
    <div className="header">
      <div className="center">
        <a href="/diary" className="link">
          Дневник
        </a>
        <a href="/report" className="link">
          Отчет
        </a>
      </div>
    </div>
  );
}

export default HeaderComponent;