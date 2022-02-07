import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Typography, Button, Grid } from '@material-ui/core';


const Navbar = ({ props }) => {

  const handleLogout = async () => {
    props.history.push('/');
    await axios.get(`/api/logout`)
      .then(() => {
        props.clearUser();

      })
      .catch(err => console.log(err))
  };

  const LoggedInNavbar = () => {
      if(props.location.pathname === '/'){
          return( 
            <>
              <Button onClick={() => props.history.push('/users_library')} >Your Library</Button>
              <Button onClick={() => props.history.push('/authentication')} >Your Account</Button>
              <Button onClick={handleLogout} >Logout</Button>
            </>
          );
    } else if (props.location.pathname === '/authentication'){
      return(
        <>
              <Button onClick={() => props.history.push('/users_library')} >Your Library</Button>
              <Button onClick={() => props.history.push('/')} >Public Library</Button>
              <Button onClick={handleLogout} >Logout</Button>
        </>
      );
    } else if (props.location.pathname === '/users_library'){
      return(
        <>
        <Button onClick={() => props.history.push('/')} >Public Library</Button>
        <Button onClick={() => props.history.push('/authentication')} >Your Account</Button>
              <Button onClick={handleLogout} >Logout</Button>
        </>
      );
    };
  };

  const LoggedOutNavbar = () => {
    if(props.location.pathname === '/'){
      return(
        <Button onClick={() => props.history.push('/authentication')}>Login/Register</Button>
      );
    } else if(props.location.pathname === '/authentication'){
      return (
        <Button onClick={() => props.history.push('/')} >Public Library</Button>
      );
    };
  };

  return (
   <div className='navbar' >
     <Typography>Your Library</Typography>
      {props.user.user_id ? <LoggedInNavbar/> : <LoggedOutNavbar/> }
   </div>
  )
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Navbar);
