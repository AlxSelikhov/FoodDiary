import React from "react";
import { Route, Routes } from "react-router-dom";
import DairyPage from "../page/DairyPage";
import "../styles/GlobalStyles.css"; // Импорт глобальных стилей

function AppRouter() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<DairyPage />}/>
        <Route path="/dairy" element={<DairyPage />}/>
        <Route path="/report" element={<DairyPage />}/>
      </Routes>
    </div>
  );
}

export default AppRouter;