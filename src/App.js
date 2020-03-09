import React from "react";
import "./App.css";
import { HashRouter } from 'react-router-dom';
import routes from './routes';
import NavBar from './components/NavBar/navBar';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <NavBar/>
        <div>Cocktails App</div>
        {routes}
      </div>
    </HashRouter>
  );
}

export default App;
