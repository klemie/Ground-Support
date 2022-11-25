import React, { useEffect, useState } from 'react';
import './App.css';
import Module from '../components/module';

function App() {
  const [randomValues, setRandomValues] = useState([0,0,0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const a = Math.floor(Math.random() * 60), 
        b = Math.floor(Math.random() * 60), 
        c = Math.floor(Math.random() * 60);
      setRandomValues([a, b, c]);
      console.log([a, b, c]);
    }, 10000);
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Module 
          title="ModTitle" 
          fields={ ["F1", "F2", "F3"] } 
          fieldValues={ randomValues }
          fieldRanges= { [[0,50], [0,50], [0,50]] }
        />
      </header>
    </div>
  );
}

export default App;
