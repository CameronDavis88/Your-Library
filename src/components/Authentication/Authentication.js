//codingMuse();
import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser, clearUser } from '../../redux/reducer';
import { Typography, Grid } from '@material-ui/core';
import Navbar from '../Navbar/Navbar';
import '../../styles/Authentication.css';

const Authentication = (props) => {
  //React Hooks for input field values
  const { username, email } = props.user;
  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmationInput, setPasswordConfirmationInput] = useState('');
  const [oldPasswordInput, setOldPasswordInput] = useState('');
  //Hooks for conditional rendering the views depending on what the user is doing
  const [registerView, setRegisterView] = useState(false);
  const [deletingView, setDeletingView] = useState(false);
  const [checkingView, setCheckingView] = useState(false);
  const [updatingView, setUpdatingView] = useState(false);

  //Registers the user's information from the input fields and sends it to the backend
  const handleRegister = async () => {
    if (props.user.user_id) {
      props.clearUser();
    };
    const newUser = {
      username: usernameInput,
      password: passwordInput,
      email: emailInput
    };
    if (passwordInput === '' || passwordConfirmationInput === '') {
      alert('Must provide valid inputs to proceed');
    } else {
      if (passwordInput === passwordConfirmationInput) {
        await axios.post('/api/register', newUser)
          .then(({ data }) => {
            props.getUser(data);
            props.history.push('/users_library');
            alert("Congratulations, you're all registered!");
          })
          .catch(err => {
            alert('Sorry, there was an error. The email you submitted may already have an account with us.');
            console.log(err);
          });
      } else {
        alert("Passwords don't match");
      };
    };
  };

  const handleLogin = async () => {
    const user = {
      email: emailInput,
      password: passwordInput
    };

    if (passwordInput === '' || emailInput === '') {
      alert('Must provide valid inputs to proceed');
    } else { }
    await axios.post(`/api/login`, user)
      .then(({ data }) => {
        //getUser is a function from redux store
        props.getUser(data);
        //When the user logs in they are sent to their own library view
        props.history.push('/users_library');
      })
      .catch(err => {
        alert(`Sorry, something went wrong. The email or password you provided may not be correct`);
        console.log(err);
      });
  };

  //Sends the user's inputs to backend to update their information
  const updateUsersInfo = async () => {
    const { username, user_id, email } = props.user
    const updatedUser = {
      username: usernameInput === '' ? username : usernameInput,
      password: passwordInput,
      oldPassword: oldPasswordInput,
      email: emailInput === '' ? email : emailInput,
      oldEmail: email,
    }
    //Checks that their passwords are consistent 
    if (passwordInput === passwordConfirmationInput) {
      await axios.put(`/api/user/${user_id}`, updatedUser)
        .then(({ data }) => {
          props.getUser(data);
          props.history.push('/users_library');
          alert("Congratulations, your info is all updated!");
        })
        .catch(err => {
          alert('Sorry, something went wrong... Make sure your current password is correct and the new email is not already connected to another account.')
          console.log(err)
        });
    } else {
      alert("Passwords don't match");
    };
  };

  //Deletes user's account from database and ends user's session
  const deleteUsersAccount = async () => {
    const { user_id, email } = props.user
    const user = {
      password: passwordInput,
      email: email,
    };
    if (passwordInput === '' || passwordConfirmationInput === '') {
      alert('Must provide valid inputs to proceed');
      setCheckingView(false);
    } else {
      if (passwordInput === passwordConfirmationInput) {
        await axios.put(`/api/delete_user/${user_id}`, user)
          .then(() => {
            props.clearUser();
            setCheckingView(false);
            setDeletingView(false);
            props.history.push('/');
            alert(`You account has been deleted`);
          })
          .catch(err => {
            alert('Sorry, something went wrong... Make sure your password was correct.');
            console.log(err);
          });
      } else {
        alert("Passwords don't match");
      }
    };
  };

  return (
    <div className='auth-page' >
      <Navbar props={props} className='navbar' />
      {/* conditionally renders the view depending of if the user is logged in or not */}
      {props.user.user_id
        ?
        // This view displays the user's info and offers them the choice of updating their info or deleting account
        <main className='profile-content' >
          {/* Conditionally renders depending on boolean of deletingView hook */}
          {deletingView === false && updatingView === false
            ?
            <Grid className='profile' >
              <Typography variant='h2' >Your Account</Typography>
              <br />
              <Typography variant='h4' > Your Username : {username}</Typography>
              <Typography variant='h4' >Your Email: {email}</Typography>
              <br />
              <button onClick={() => setUpdatingView(true)} >Edit Your Account Information</button>
              <br />
              <button onClick={() => setDeletingView(true)} >Delete Account</button>
            </Grid>
            :
            <>
              {deletingView === true && updatingView === false
                ?
                // This view is for deleting the users account and conditionally renders a confirmation of the desire to delete it
                <Grid className='deleting-account'>
                  <input onChange={(e) => setPasswordInput(e.target.value)} placeholder='Password' value={passwordInput} />
                  <input onChange={(e) => setPasswordConfirmationInput(e.target.value)} placeholder='Confirm Password' value={passwordConfirmationInput} />

                  {checkingView === false ?
                    <Grid>
                      <button onClick={() => setCheckingView(true)}>Delete Account</button>
                      <button onClick={() => {
                        setCheckingView(false)
                        setDeletingView(false)
                      }} >Cancel/Back</button>
                    </Grid>
                    :
                    <Grid>
                      <h2>Are you sure you want to delete your account?</h2>
                      <button onClick={deleteUsersAccount} >Yes, delete my account</button>
                      <button onClick={() => setCheckingView(false)} >No, cancel</button>
                    </Grid>
                  }
                </Grid>
                :
                // This view is for updating the user's info
                <Grid className='updating-user' >
                  <div className='bottom' >
                    <h2>Update your information</h2>
                    <p>-Whatever value you leave blank will remain the same as before-</p>
                  </div>
                  <input onChange={(e) => setUsernameInput(e.target.value)} placeholder='New Username' value={usernameInput} />
                  <input onChange={(e) => setEmailInput(e.target.value)} placeholder='New Email' value={emailInput} />
                  <br />
                  <input onChange={(e) => setPasswordInput(e.target.value)} placeholder='New Password' value={passwordInput} />
                  <input onChange={(e) => setPasswordConfirmationInput(e.target.value)} placeholder='Confirm New Password' value={passwordConfirmationInput} />
                  <br />
                  <div className='bottom' >
                    <input onChange={(e) => setOldPasswordInput(e.target.value)} placeholder='Confirm CURRENT Password' value={oldPasswordInput} />
                    <br />
                    <button onClick={updateUsersInfo} >Submit Edits</button>
                    <br />
                    <button onClick={() => setUpdatingView(false)} >Cancel/back</button>
                  </div>

                </Grid>}
            </>
          }
        </main>

        :
          // Below here is rendered when user is not logged in
        <main className='profile-content' >
          {registerView === true
            ?
            // This view is for creating an account
            <Grid className='bottom'>
              <h2>Create an account Below</h2>
              <br />
              <div>
                <input onChange={(e) => setUsernameInput(e.target.value)} placeholder='Username' value={usernameInput} />
                <input onChange={(e) => setEmailInput(e.target.value)} placeholder='Email' value={emailInput} />
              </div>
              <div>
                <input onChange={(e) => setPasswordInput(e.target.value)} placeholder='Password' value={passwordInput} />
                <input onChange={(e) => setPasswordConfirmationInput(e.target.value)} placeholder='Confirm Password' value={passwordConfirmationInput} />
              </div>

              <br />
              <button onClick={handleRegister} >Create Account</button>
              <br />
              <button onClick={() => setRegisterView(false)} >Back to Login</button>
            </Grid>
            :
            // This view is for loggin in or to send the user to the registering view
            <Grid className='loggingIn' >
              <div className='bottom' >
                <h2>Create an account or login below</h2>
                <button className='register-btn' onClick={() => setRegisterView(true)} >Create Account Here</button>
              </div>
              <br />
              <br />
              <br />
              <input onChange={(e) => setEmailInput(e.target.value)} placeholder='Email' value={emailInput} />
              <input onChange={(e) => setPasswordInput(e.target.value)} placeholder='Password' value={passwordInput} />
              <br />
              <div className='bottom'  >
                <button onClick={handleLogin} >Login</button>
              </div>
            </Grid>}
        </main>
      }
    </div>
  );
};

//Exporting component and accessing redux material
const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, clearUser })(Authentication);