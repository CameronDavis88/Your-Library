//codingMuse();
import React from 'react';
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Authentication from './components/Authentication/Authentication';
import UsersLibrary from './components/UsersLibrary/UsersLibrary';
import Dashboard from './components/Dashboard/Dashboard';
import SelectedBook from './components/UsersLibrary/SelectedBook';
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter;

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/authentication' component={Authentication} />
          <Route path='/users_library' component={UsersLibrary} />
          <Route path='/selected_book' component={SelectedBook} />
        </Switch>
      </Router>
    </div>
  );
};


const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(App);
