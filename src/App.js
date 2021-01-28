
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from './component/Header/Header';
import Navbar from './component/Navbar/Navbar';

import Overview from './component/Overview/Overview';

import Sector from './component/Sector/Sector';

import HeaderContent from './component/Header/HeaderContent/HeaderContent';


import './App.css';





function App() {

  // let match = useRouteMatch();
  // console.log("match: " + JSON.stringify(match));

  return (
    <BrowserRouter>
      <Header render={<HeaderContent />}/>
      <div className="nav_content">
        <Navbar />
        <div className="content-container">
          <Switch>
            <Route exact path="/overview">
              <Overview />
            </Route>
            <Route path="/sectors/:subsector" component={Sector} />
             

          </Switch>
        </div>
      </div>

    </BrowserRouter>
  );
}

export default App;
