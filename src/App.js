
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from './component/Header/Header';
import Navbar from './component/Navbar/Navbar';

import Overview from './component/Overview/Overview';

import Sector from './component/Sector/Sector';


import './App.css';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="nav_content">
        <Navbar />
        <div className="content-container">
          <Switch>
            <Route exact path="/overview">
              <Overview />
            </Route>
            <Route path="/sectors/subsector1">
              <Sector name="1" />
            </Route>
            <Route path="/sectors/subsector2">
              <Sector name="2" />
            </Route>
            <Route path="/sectors/subsector3">
              <Sector name="3" />
            </Route>

          </Switch>
        </div>
      </div>

    </BrowserRouter>
  );
}

export default App;
