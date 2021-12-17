import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      books : [],
    }

  }
  componentDidMount(){
    axios.get(`/api/books`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }

  render(){
   return (
    <div>

    </div>
   )
  }
}

export default App;
