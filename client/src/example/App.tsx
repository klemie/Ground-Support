import React from 'react';
import './App.css';
import TextButtons from '../views/example-view';
import Module from '../components/module';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Module title="ModTitle" fields={["F1", "F2", "F3"]}/>
      </header>
    </div>
  );
}

export default App;
