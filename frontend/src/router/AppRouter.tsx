import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from '../page/Homepage';
import Schedulepage from '../page/Schedulepage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/diary" element={<Schedulepage />} />
        <Route path="/report" element={<Homepage />}/>
      </Routes>
    </Router>
  );
};

export default AppRouter;