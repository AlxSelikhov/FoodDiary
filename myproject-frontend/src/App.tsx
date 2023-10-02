import React, { useEffect, useState } from 'react';
import WeekListComponent from './components/WeekListComponent';

interface DataItem {
  calendar_name: string;
}

function App() {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/calendar')
      .then((response) => response.json())
      .then((responseData: DataItem[]) => setData(responseData));
  }, []);
  
  return (
    <div>
      <WeekListComponent />
      {/* {data.map((item, index) => (
        <div key={index}>
          <h1>{item.calendar_name}</h1>
        </div>
      ))} */}
    </div>
  );
}

export default App;