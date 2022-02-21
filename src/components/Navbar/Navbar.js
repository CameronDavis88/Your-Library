import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { clearUser } from '../../redux/reducer';
import '../../styles/Navbar.css';

const Navbar = ({ props }) => {
//Obviously, this logs the user out and ends their session
  const handleLogout = async () => {
    props.history.push('/');
    await axios.get(`/api/logout`)
      .then(() => {
        props.clearUser();

      })
      .catch(err => console.log(err))
  };

  //This is the conditional rendering for the Navbar when user is logged in
  const LoggedInNavbar = () => {
    //Conditional rendering of Navbar when logged in and on Dashboard view
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
       //Conditional rendering of Navbar when logged in and on Authentication view
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
       //Conditional rendering of Navbar when logged in and on UsersLibrary view
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
       //Conditional rendering of Navbar when logged in and on view of a Selected Book from the User's Library
    } else if (props.location.pathname === '/selected_book') {
      return (
        <>
          <div className='nav-link'>
            <Typography variant='h5' onClick={() => props.history.push('/users_library')} >Your Library</Typography>
          </div>
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
       //Conditional rendering of Navbar when logged in and on view of a Selected Book from the Public Library
    } else if (props.location.pathname === '/selected_pub_book') {
      return (
        <>
          <div className='nav-link'>
            <Typography variant='h5' onClick={() => props.history.push('/users_library')} >Your Library</Typography>
          </div>
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
    };
  };

   //This is the conditional rendering for the Navbar when user is NOT logged in
  const LoggedOutNavbar = () => {
    //When NOT logged in the user cannot access the UsersLibrary component
    if (props.location.pathname === '/users_library') {
      props.history.push('/');
      return (
        <></>
      );
      //Conditional rendering of Navbar when NOT logged in and on Dashboard view
    } else if (props.location.pathname === '/') {
      return (
        <Typography variant='h5' className='nav-link' onClick={() => props.history.push('/authentication')}>Login/Register</Typography>
      );
       //Conditional rendering of Navbar when NOT logged in and on Authentication view
    } else if (props.location.pathname === '/authentication') {
      return (
        <Typography variant='h5' className='nav-link' onClick={() => props.history.push('/')} >Public Library</Typography>
      );
       //Conditional rendering of Navbar when NOT logged in and on view of a Selected Book from the Public Library
    } else if (props.location.pathname === '/selected_pub_book') {
      return (
        <>
          <div className='nav-link'>
            <Typography variant='h5' onClick={() => props.history.push('/')} >Public Library</Typography>
          </div>
          <div className='nav-link'>
            <Typography variant='h5' className='nav-link' onClick={() => props.history.push('/authentication')}>Login/Register</Typography>
          </div>
        </>
      );
      //When NOT logged in the user cannot access the view of a Selected Book from the Public Library
    } else if (props.location.pathname === '/selected_book') {
      props.history.push('/');
      return (
        <></>
      );
    };
  };

  //Navbar conditionally rendering the according to the logged in or logged out views from above
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

//Exporting component and accessing redux material
const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { clearUser })(Navbar);
