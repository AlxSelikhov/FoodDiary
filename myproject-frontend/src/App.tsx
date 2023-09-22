import React, { useEffect, useState } from 'react';

interface DataItem {
  Hello: string;
}

function App() {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/')
      .then((response) => response.json())
      .then((responseData: DataItem[]) => setData(responseData));
  }, []);

  console.log(data);
  
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <h1>{item.Hello}</h1>
        </div>
      ))}
    </div>
  );
}

export default App;