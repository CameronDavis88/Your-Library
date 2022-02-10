//codingMuse();
import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser, clearUser } from '../../redux/reducer';
import { Typography, Grid } from '@material-ui/core';
import Navbar from '../Navbar/Navbar';
import './Authentication.css';

const Authentication = (props) => {
  const { username, email } = props.user;
  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmationInput, setPasswordConfirmationInput] = useState('');
  const [registerView, setRegisterView] = useState(false);
  const [oldPasswordInput, setOldPasswordInput] = useState('');
  const [deletingView, setDeletingView] = useState(false);
  const [checkingView, setCheckingView] = useState(false);
  const [updatingView, setUpdatingView] = useState(false);

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
        props.getUser(data);
        props.history.push('/users_library');
      })
      .catch(err => {
        alert(`Sorry, something went wrong. The email or password you provided may not be correct`);
        console.log(err);
      });
  };

  const updateUsersInfo = async () => {
    const { username, user_id, email } = props.user
    const updatedUser = {
      username: usernameInput === '' ? username : usernameInput,
      password: passwordInput,
      oldPassword: oldPasswordInput,
      email: emailInput === '' ? email : emailInput,
      oldEmail: email,
    }
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
    <div className='page' >
      <Navbar props={props} className='navbar' />
      {props.user.user_id
        ?
        <main className='profile-content' >
          {deletingView === false && updatingView === false
            ?
            <Grid className='profile' >
              <Typography variant='h2' >Your Account</Typography>
              <br />
              <Typography variant='h4' > Your Username : {username}</Typography>
              <Typography variant='h4' >Your Email: {email}</Typography>
              <button onClick={() => setUpdatingView(true)} >Edit Your Account Information</button>
              <button onClick={() => setDeletingView(true)} >Delete Account</button>
            </Grid>
            :
            <>
              {deletingView === true && updatingView === false 
              ?
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
                <Grid className='updating-user' >
                  <h2>Update your information</h2>
                  <h4>Whatever value you leave blank will remain the same as before</h4>
                  <input onChange={(e) => setUsernameInput(e.target.value)} placeholder='New Username' value={usernameInput} />
                  <input onChange={(e) => setEmailInput(e.target.value)} placeholder='New Email' value={emailInput} />
                  <input onChange={(e) => setPasswordInput(e.target.value)} placeholder='New Password' value={passwordInput} />
                  <input onChange={(e) => setPasswordConfirmationInput(e.target.value)} placeholder='Confirm New Password' value={passwordConfirmationInput} />
                  <br />
                  <input onChange={(e) => setOldPasswordInput(e.target.value)} placeholder='Confirm CURRENT Password' value={oldPasswordInput} />
                  <button onClick={updateUsersInfo} >Submit Edits</button>
                  <button onClick={() => setUpdatingView(false)} >Cancel/back</button>
                </Grid>}
            </>
          }
        </main>

        :

        <main className='profile-content' >
          {registerView === true
            ?
            <Grid className='registering'>
              <h2>Create an account Below</h2>
              <br />
              <button onClick={() => setRegisterView(false)} >Back to Login</button>
              <br />
              <input onChange={(e) => setUsernameInput(e.target.value)} placeholder='Username' value={usernameInput} />
              <input onChange={(e) => setEmailInput(e.target.value)} placeholder='Email' value={emailInput} />
              <input onChange={(e) => setPasswordInput(e.target.value)} placeholder='Password' value={passwordInput} />
              <input onChange={(e) => setPasswordConfirmationInput(e.target.value)} placeholder='Confirm Password' value={passwordConfirmationInput} />
              <button onClick={handleRegister} >Create Account</button>
            </Grid>
            :
            <Grid className='loggingIn' >
              <h2>Login Below</h2>
              <br />
              <input onChange={(e) => setEmailInput(e.target.value)} placeholder='Email' value={emailInput} />
              <input onChange={(e) => setPasswordInput(e.target.value)} placeholder='Password' value={passwordInput} />
              <button onClick={handleLogin} >Login</button>
              <h4>Don't have an account yet?</h4> <button onClick={() => setRegisterView(true)} >Create Account Here</button>
            </Grid>}
        </main>
      }
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, clearUser })(Authentication);