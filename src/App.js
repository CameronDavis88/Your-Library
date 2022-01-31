//codingMuse();
import React from 'react';
import {  HashRouter, Routes, Route } from 'react-router-dom';
import Authentication from './components/Dashboard/Authentication';
import UsersLibrary from './components/UsersLibrary/UsersLibrary';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './Navbar/Navbar';

const App = () => {
  return (
    <div>
      <Navbar/>
      <HashRouter>
        <Routes>
          <Route exact path='/' element={<Dashboard/>} />
          <Route exact path='/authentication' element={<Authentication/>} />
          <Route exact path='/users_library' element={<UsersLibrary/>} />

        </Routes>
      </HashRouter>
      {/* {routes}  --- When routes are put in no need to render Dashboard here, just set it's exact path to '/'    */}
      {/* <Dashboard/> */}
    </div>
  )
};

export default App;
