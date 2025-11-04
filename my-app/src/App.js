import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/data')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>MySQL Data</h1>
      <ul>
        {data.map(users => (
          <li>{users.name}</li> // adjust to your table structure
        ))}
      </ul>
    </div>
  );
}

export default App;