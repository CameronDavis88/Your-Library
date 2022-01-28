import React, { Component} from 'react';


//I think you will need to have all the data from the books sent and retrieved from the database, not gutenberg (see and alter AddBook function)
// unless you set a condition if the book has been edited then only send the edited version --which would be weird just sent all the data to the database
//then you will need to or can use the functionality of the getBooks or getData in the controllers

  //This was the endpoints I had used in the getData in App before
    // axios.get(`/api/data`)
    //   .catch(err => console.log(err));

class UsersLibrary extends Component {
    constructor(props){
        super(props)

    }
    
    render(){
        return (
            <div>
    
            </div>
        )
    }
};

export default UsersLibrary;
