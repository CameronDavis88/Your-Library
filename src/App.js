//codingMuse();
import React from 'react';
import {  HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom';
import Authentication from './components/Dashboard/Authentication';
import UsersLibrary from './components/UsersLibrary/UsersLibrary';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter;

const App = () => {
  return (
    <div>
      {/* <Navbar/> */}
      {/* <Authentication/> */}
      <Router>
        <Switch>
          {/* <Route exact path='/' element={<Dashboard/>} />
          <Route path='/authentication' element={<Authentication/>} />
          <Route  path='/users_library' element={<UsersLibrary/>} /> */}
          <Route exact path='/' component={Dashboard} />
          <Route path='/authentication' component={Authentication} />
          <Route  path='/users_library' component={UsersLibrary} />

        </Switch>
      </Router>
      {/* {routes}  --- When routes are put in no need to render Dashboard here, just set it's exact path to '/'    */}
      {/* <Dashboard/> */}
    </div>
  )
};

export default App;
