import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

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
              <button onClick={() => props.history.push('/users_library')} >Your Library</button>
              <button onClick={() => props.history.push('/authentication')} >Your Account</button>
              <button onClick={handleLogout} >Logout</button>
            </>
          );
    } else if (props.location.pathname === '/authentication'){
      return(
        <>
              <button onClick={() => props.history.push('/users_library')} >Your Library</button>
              <button onClick={() => props.history.push('/')} >Public Library</button>
              <button onClick={handleLogout} >Logout</button>
        </>
      );
    } else if (props.location.pathname === '/users_library'){
      return(
        <>
        <button onClick={() => props.history.push('/')} >Public Library</button>
        <button onClick={() => props.history.push('/authentication')} >Your Account</button>
              <button onClick={handleLogout} >Logout</button>
        </>
      );
    };
  };

  const LoggedOutNavbar = () => {
    if(props.location.pathname === '/'){
      return(
        <button onClick={() => props.history.push('/authentication')}>Login/Register</button>
      );
    } else if(props.location.pathname === '/authentication'){
      return (
        <button onClick={() => props.history.push('/')} >Public Library</button>
      );
    };
  };

  return (
   <div className='navbar' >
      {props.user.user_id ? <LoggedInNavbar/> : <LoggedOutNavbar/> }
   </div>
  )
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Navbar);
