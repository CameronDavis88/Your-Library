//codingMuse();
import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './Navbar/Navbar';

const App = () => {
  return (
    <div>
      <Navbar/>
      {/* {routes}  --- When routes are put in no need to render Dashboard here, just set it's exact path to '/'    */}
      <Dashboard/>
    </div>
  )
};

export default App;
