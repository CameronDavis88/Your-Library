import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { clearUser } from '../../redux/reducer';
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
          <div className='nav-link'>
            <Typography variant='h5' onClick={() => props.history.push('/users_library')} >Your Library</Typography>
          </div>
          <div className='nav-link'>
            <Typography variant='h5' onClick={() => props.history.push('/authentication')} >Your Account</Typography>
          </div>
          <div className='nav-link'>
            <Typography variant='h5' onClick={handleLogout} >Logout</Typography>
          </div>
        </>
      );
    } else if (props.location.pathname === '/authentication') {
      return (
        <>
          <div className='nav-link'>
            <Typography variant='h5' onClick={() => props.history.push('/users_library')} >Your Library</Typography>
          </div>
          <div className='nav-link'>
            <Typography variant='h5' onClick={() => props.history.push('/')} >Public Library</Typography>
          </div>
          <div className='nav-link'>
            <Typography variant='h5' onClick={handleLogout} >Logout</Typography>
          </div>
        </>
      );
    } else if (props.location.pathname === '/users_library') {
      return (
        <>
          <div className='nav-link' >
            <Typography variant='h5' onClick={() => props.history.push('/')} >Public Library</Typography>
          </div>
          <div className='nav-link'>
            <Typography variant='h5' onClick={() => props.history.push('/authentication')} >Your Account</Typography>
          </div>
          <div className='nav-link'>
            <Typography variant='h5' onClick={handleLogout} >Logout</Typography>
          </div>
        </>
      );
    } else if (props.location.pathname === '/selected_book') {
      return (
        <>
        {/* <div className='nav-link'>
          <Typography variant='h5' onClick={() => props.history.push('/users_library')} >Your Library</Typography>
        </div> */}
        <div className='nav-link'>
          <Typography variant='h5' onClick={() => props.history.push('/')} >Public Library</Typography>
        </div>
        <div className='nav-link'>
            <Typography variant='h5' onClick={() => props.history.push('/authentication')} >Your Account</Typography>
          </div>
        <div className='nav-link'>
          <Typography variant='h5' onClick={handleLogout} >Logout</Typography>
        </div>
      </>
      );
    } else if (props.location.pathname === '/selected_pub_book') {
      return (
        <>
        <div className='nav-link'>
          <Typography variant='h5' onClick={() => props.history.push('/users_library')} >Your Library</Typography>
        </div>
        {/* <div className='nav-link'>
          <Typography variant='h5' onClick={() => props.history.push('/')} >Public Library</Typography>
        </div> */}
        <div className='nav-link'>
            <Typography variant='h5' onClick={() => props.history.push('/authentication')} >Your Account</Typography>
          </div>
        <div className='nav-link'>
          <Typography variant='h5' onClick={handleLogout} >Logout</Typography>
        </div>
      </>
      );
    };
  };

  const LoggedOutNavbar = () => {
    if (props.location.pathname === '/users_library') {
      props.history.push('/');
      return (
        <></>
      );
    } else if (props.location.pathname === '/') {
      return (
        <Typography variant='h5' className='nav-link' onClick={() => props.history.push('/authentication')}>Login/Register</Typography>
      );
    } else if (props.location.pathname === '/authentication') {
      return (
        <Typography variant='h5' className='nav-link' onClick={() => props.history.push('/')} >Public Library</Typography>
      );
    } else if (props.location.pathname === '/selected_pub_book') {
      return (
        <Typography variant='h5' className='nav-link' onClick={() => props.history.push('/authentication')}>Login/Register</Typography>
      );
    } else if (props.location.pathname === '/selected_book') {
      props.history.push('/');
      return (
        <></>
      )
    }
  };


  return (
    <div className='navbar' >
      <Typography variant='h4' className='nav-title' >Your Library</Typography>
      <div className='spacer' ></div>
      <div className='nav-link-box'>
        <div className='nav-links' >
          {props.user.user_id ? <LoggedInNavbar /> : <LoggedOutNavbar />}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { clearUser })(Navbar);
