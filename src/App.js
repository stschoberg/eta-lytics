import React from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import './App.css';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          We're working on it.
        </p>
      </header>
    </div>
  );
}

export default App;
