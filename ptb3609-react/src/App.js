import React from 'react';
//import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import './App.css';


function Welcome(props){
  return <h1>Hello, {props.name}</h1>
}

function App() {
  return (
    <div className="App">
      <Welcome name="Peter" />
    </div>

  );
}

//ReactDOM.render(
//  <App />,
//  document.getElementById('root')
//);

export default App;