import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


const Navbar = ({ props }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log(props)
    if (props.user.user_id) {
      setLoggedIn(true)
    }
  }, [])

  const handleLogout = async () => {
    props.history.push('/');
    await axios.get(`/api/logout`)
      .then(() => {
        props.clearUser();

      })
      .catch(err => console.log(err))
  };

  return (
    <div>
      ---------This is the navbar---------
      {/* START of outermost bracket */}
      {props.location.pathname === '/' ?
        <div>
          {loggedIn === true ?
            <>
              <button onClick={handleLogout} >Logout</button>
              <button onClick={() => props.history.push('/users_library')} >Your Library</button>
              <button onClick={() => props.history.push('/authentication')} >Your Account</button>
            </>
            :
            <>
              <button onClick={() => props.history.push('/authentication')} >Login/Register</button>
            </>
          }
        </div>

        :
        // Below here is either Authentication of UsersLibrary
        <div>

          {props.location.pathname === '/authentication' ?
            <div>
              <button onClick={() => props.history.push('/')} >Back to Public Library</button>
            </div>
            // Below here is usersLibrary
            :
            <div>
              <button onClick={handleLogout} >Logout</button>
              <button onClick={() => props.history.push('/')} >Back to Public Library</button>
              <button onClick={() => props.history.push('/authentication')} >Your Account</button>
            </div>
          }

        </div>
      }
      {/* END of outermost bracket */}
    </div>
  )
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Navbar);
