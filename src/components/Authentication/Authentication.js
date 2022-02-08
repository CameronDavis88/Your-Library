import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser, clearUser } from '../../redux/reducer';
import { Typography, Button, Grid, TextField } from '@material-ui/core';
import Navbar from '../Navbar/Navbar';

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
    }
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
    <div>
      <Navbar props={props} />
      {props.user.user_id
        ?
        <>
          {deletingView === false && updatingView === false
            ?
            <Grid className='profile' >
              <Typography variant='h1' >Your Account</Typography>
              <br />
              <Typography variant='h3' > Your Username : {username}</Typography>
              <Typography variant='h3' >Your Email: {email}</Typography>
              <Button onClick={() => setUpdatingView(true)} >Edit Your Account Information</Button>
              <Button onClick={() => setDeletingView(true)} >Delete Account</Button>
            </Grid>
            :
            <>
              {deletingView === true && updatingView === false 
              ?
               <Grid className='deleting-account'>
                <TextField onChange={(e) => setPasswordInput(e.target.value)} placeholder='Password' value={passwordInput} />
                <TextField onChange={(e) => setPasswordConfirmationInput(e.target.value)} placeholder='Confirm Password' value={passwordConfirmationInput} />

                {checkingView === false ?
                  <Grid>
                    <Button onClick={() => setCheckingView(true)}>Delete Account</Button>
                    <Button onClick={() => {
                      setCheckingView(false)
                      setDeletingView(false)
                    }} >Cancel/Back</Button>
                  </Grid>
                  :
                  <Grid>
                    <h2>Are you sure you want to delete your account?</h2>
                    <Button onClick={deleteUsersAccount} >Yes, delete my account</Button>
                    <Button onClick={() => setCheckingView(false)} >No, cancel</Button>
                  </Grid>
                }
              </Grid>
                :
                <Grid className='updating-user' >
                  <h2>Update your information</h2>
                  <h4>Whatever value you leave blank will remain the same as before</h4>
                  <TextField onChange={(e) => setUsernameInput(e.target.value)} placeholder='New Username' value={usernameInput} />
                  <TextField onChange={(e) => setEmailInput(e.target.value)} placeholder='New Email' value={emailInput} />
                  <TextField onChange={(e) => setPasswordInput(e.target.value)} placeholder='New Password' value={passwordInput} />
                  <TextField onChange={(e) => setPasswordConfirmationInput(e.target.value)} placeholder='Confirm New Password' value={passwordConfirmationInput} />
                  <br />
                  <TextField onChange={(e) => setOldPasswordInput(e.target.value)} placeholder='Confirm CURRENT Password' value={oldPasswordInput} />
                  <Button onClick={updateUsersInfo} >Submit Edits</Button>
                  <button onClick={() => setUpdatingView(false)} >Cancel/back</button>
                </Grid>}
            </>
          }
        </>

        :

        <>
          {registerView === true
            ?
            <Grid className='registering'>
              <h2>Create an account Below</h2>
              <br />
              <button onClick={() => setRegisterView(false)} >Back to Login</button>
              <br />
              <TextField onChange={(e) => setUsernameInput(e.target.value)} placeholder='Username' value={usernameInput} />
              <TextField onChange={(e) => setEmailInput(e.target.value)} placeholder='Email' value={emailInput} />
              <TextField onChange={(e) => setPasswordInput(e.target.value)} placeholder='Password' value={passwordInput} />
              <TextField onChange={(e) => setPasswordConfirmationInput(e.target.value)} placeholder='Confirm Password' value={passwordConfirmationInput} />
              <button onClick={handleRegister} >Create Account</button>
            </Grid>
            :
            <Grid className='loggingIn' >
              <h2>Login Below</h2>
              <br />
              <TextField onChange={(e) => setEmailInput(e.target.value)} placeholder='Email' value={emailInput} />
              <TextField onChange={(e) => setPasswordInput(e.target.value)} placeholder='Password' value={passwordInput} />
              <button onClick={handleLogin} >Login</button>
              <h4>Don't have an account yet?</h4> <button onClick={() => setRegisterView(true)} >Create Account Here</button>
            </Grid>}
        </>
      }
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUser, clearUser })(Authentication);