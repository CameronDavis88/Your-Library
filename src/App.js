import React from 'react';
// import axios from 'axios';
import './App.css';
import AllBooks from './components/AllBooks';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      
    }

  }
  
  render(){
    return(
      <div>
        <AllBooks/>
      </div>
    )
  }
}

export default App;
