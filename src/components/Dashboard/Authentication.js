import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser, clearUser } from '../../redux/reducer';
import Navbar from '../Navbar/Navbar';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

//    This component will be rendered instead of the Dashboard when the user clicks login or register 
//-- and will conditionally render depending on if the user is registering or logging in
// ---- it will be router through routes 

const Authentication = (props) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmationInput, setPasswordConfirmationInput] = useState('');
  const [registerView, setRegisterView] = useState(false);
 const [oldPasswordInput, setOldPasswordInput] = useState('');
 const [newAccountView, setNewAccountView] = useState(false);


  useEffect(() => {

    console.log(props)
    console.log(registerView)

  }, [])

  useEffect(() => {

    console.log(props)
    console.log(registerView)

  }, [registerView])


  const handleRegister = async () => {
     if(props.user.user_id){
      props.clearUser();
     };
    const newUser = {
      username: usernameInput,
      password: passwordInput,
      email: emailInput
    };

    if (passwordInput === passwordConfirmationInput) {
      await axios.post('/api/register', newUser)
        .then(({ data }) => {
          props.getUser(data);
          props.history.push('/users_library');
          // console.log(props)
          alert("Congratulations, you're all registered!");
        })
        .catch(err => {
          alert('Sorry, there was an error. The email you submitted may already have an account with us.')
          console.log(err);
        });
    } else {
      alert("Passwords don't match");
    };
  };

  const handleLogin = async () => {
    const user = {
      email: emailInput,
      password: passwordInput
    };
    await axios.post(`/api/login`, user)
      .then(({ data }) => {
        props.getUser(data)
        props.history.push('/users_library');
      })
      .catch(err => {
        alert(`Sorry, something went wrong. The email or password you provided may not be correct`)
        console.log(err)
      })
  };

  const createNewAccount = async () => {
    await axios.get(`/api/logout`)
      .then(() => {
        // props.clearUser();
        setNewAccountView(true)
        setRegisterView(true);
      })
      .catch(err => console.log(err))
  };

  const updateUsersInfo = async () => {
    const {  username, user_id, email} = props.user
    const updatedUser = {
      username: usernameInput === '' ? username : usernameInput,
      password: passwordInput,
      oldPassword: oldPasswordInput,
      email: emailInput === '' ? email : emailInput,
      oldEmail: email,
    }
    console.log(updatedUser)

    if (passwordInput === passwordConfirmationInput) {
      await axios.put(`/api/user/${user_id}`, updatedUser)
        .then(({ data }) => {
          props.getUser(data);
          props.history.push('/users_library');
          // console.log(props)
          alert("Congratulations, your info is all updated!");
        })
        .catch(err => {
          alert('Sorry, something went wrong... Make sure you current password is correct and the new email is not already connected to another account.')
          console.log(err)
        });
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <div>

      <Navbar props={props} />
      This is the Authentication component
      <br/>
      <button onClick={() => setRegisterView(true)} >Register View</button>
      <button onClick={() => setRegisterView(false)} >Login View</button>

      {props.user.user_id ?
        <>
          
          {newAccountView === true ?
          
               <main className='registering'>
              
              <input onChange={(e) => setUsernameInput(e.target.value)} placeholder='Username' value={usernameInput} />
              <input onChange={(e) => setEmailInput(e.target.value)} placeholder='Email' value={emailInput} />
              <input onChange={(e) => setPasswordInput(e.target.value)} placeholder='Password' value={passwordInput} />
              <input onChange={(e) => setPasswordConfirmationInput(e.target.value)} placeholder='Confirm Password' value={passwordConfirmationInput} />
              <button onClick={handleRegister} >Submit</button>
              <button onClick={() => setNewAccountView(false)} >Cancel/Back</button>
            </main>
          :
          <>
          <h2>Update your information</h2>
          <input onChange={(e) => setUsernameInput(e.target.value)} placeholder='New Username' value={usernameInput} />
          <input onChange={(e) => setEmailInput(e.target.value)} placeholder='New Email' value={emailInput} />
          <input onChange={(e) => setPasswordInput(e.target.value)} placeholder='New Password' value={passwordInput} />
          <input onChange={(e) => setPasswordConfirmationInput(e.target.value)} placeholder='Confirm New Password' value={passwordConfirmationInput} />
          <br/>
          <input onChange={(e) => setOldPasswordInput(e.target.value)} placeholder='Confirm CURRENT Password' value={oldPasswordInput} />
          <button onClick={updateUsersInfo} >Submit Edits</button>

          <br />
          <button onClick={createNewAccount} >Create a new account</button></>
          }
          
        </>
        :
        <>
          {registerView === true
            ?
            <main className='registering'>
              This is the register page
              <input onChange={(e) => setUsernameInput(e.target.value)} placeholder='Username' value={usernameInput} />
              <input onChange={(e) => setEmailInput(e.target.value)} placeholder='Email' value={emailInput} />
              <input onChange={(e) => setPasswordInput(e.target.value)} placeholder='Password' value={passwordInput} />
              <input onChange={(e) => setPasswordConfirmationInput(e.target.value)} placeholder='Confirm Password' value={passwordConfirmationInput} />
              <button onClick={handleRegister} >Submit</button>
            </main>
            :
            <main className='loggingIn' >
              This is the login page
              <input onChange={(e) => setEmailInput(e.target.value)} placeholder='Email' value={emailInput} />
              <input onChange={(e) => setPasswordInput(e.target.value)} placeholder='Password' value={passwordInput} />
              <button onClick={handleLogin} >Login</button>
            </main>
          }
        </>

      }

    </div>
  )
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUser, clearUser })(Authentication);
