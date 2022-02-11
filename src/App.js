//codingMuse();
import React from 'react';
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Authentication from './components/Authentication/Authentication';
import UsersLibrary from './components/UsersLibrary/UsersLibrary';
import Dashboard from './components/Dashboard/Dashboard';
import SelectedBook from './components/UsersLibrary/SelectedBook';
import SelectedPubBook from './components/PubLibrary/SelectedPubBook';
//Employs HashRouter when in development mode and BrowserRouter when not
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter;

const App = () => {
  //Renders the specific components according to pathway
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/authentication' component={Authentication} />
          <Route path='/users_library' component={UsersLibrary} />
          <Route path='/selected_book' component={SelectedBook} />
          <Route path='/selected_pub_book' component={SelectedPubBook} />
        </Switch>
      </Router>
    </div>
  );
};

//Exporting component and accessing redux material
const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(App);
