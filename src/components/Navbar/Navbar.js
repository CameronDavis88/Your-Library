import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Typography, Grid } from '@material-ui/core';
import './Navbar.css'


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
    if (props.location.pathname === '/') {
      return (
        <>
          <Typography className='nav-link' onClick={() => props.history.push('/users_library')} >Your Library</Typography>
          <Typography className='nav-link' onClick={() => props.history.push('/authentication')} >Your Account</Typography>
          <Typography className='nav-link' onClick={handleLogout} >Logout</Typography>
        </>
      );
    } else if (props.location.pathname === '/authentication') {
      return (
        <>
          <Typography className='nav-link' onClick={() => props.history.push('/users_library')} >Your Library</Typography>
          <Typography className='nav-link' onClick={() => props.history.push('/')} >Public Library</Typography>
          <Typography className='nav-link' onClick={handleLogout} >Logout</Typography>
        </>
      );
    } else if (props.location.pathname === '/users_library') {
      return (
        <>
          <Typography className='nav-link' onClick={() => props.history.push('/')} >Public Library</Typography>
          <Typography className='nav-link' onClick={() => props.history.push('/authentication')} >Your Account</Typography>
          <Typography className='nav-link' onClick={handleLogout} >Logout</Typography>
        </>
      );
    };
  };

  const LoggedOutNavbar = () => {
    if (props.location.pathname === '/') {
      return (
        <Typography className='nav-link' onClick={() => props.history.push('/authentication')}>Login/Register</Typography>
      );
    } else if (props.location.pathname === '/authentication') {
      return (
        <Typography className='nav-link' onClick={() => props.history.push('/')} >Public Library</Typography>
      );
    };
  };

  return (
    <div className='navbar' >
      <Typography className='nav-title' >Your Library</Typography>
      <div className='spacer' ></div>
      <div className='nav-link-box'>
      <div className='nav-links' >
      {props.user.user_id ? <LoggedInNavbar /> : <LoggedOutNavbar />}
      </div>
      </div>
     
    </div>
  )
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Navbar);
