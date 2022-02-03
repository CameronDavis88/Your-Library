import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser, registerView } from '../../redux/reducer';

//    This component will be rendered instead of the Dashboard when the user clicks login or register 
//-- and will conditionally render depending on if the user is registering or logging in
// ---- it will be router through routes 

const Authentication = (props) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmationInput, setPasswordConfirmationInput] = useState('');
  

    
 

  useEffect(() => {
    
    console.log(props)
  }, [])
  useEffect(() => {
    // registerView(false)
    console.log(props)
  }, [props])

  const handleRegister = async () => {
    const newUser = {
      username: usernameInput,
      password: passwordInput,
      email: emailInput
    }

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
          console.log(err)
        });
    } else {
      alert("Passwords don't match");
    }
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
  }

  return (
    <div>
      This is the Authentication component
      <button onClick={() => props.registerView(true)} >registerView</button>
      <button onClick={() => props.registerView(false)} >LoginViw</button>
      <main className='registering'>
      <input onChange={(e) => setUsernameInput(e.target.value)} placeholder='Username' value={usernameInput} />
      <input onChange={(e) => setEmailInput(e.target.value)} placeholder='Email' value={emailInput} />
      <input onChange={(e) => setPasswordInput(e.target.value)} placeholder='Password' value={passwordInput} />
      <input onChange={(e) => setPasswordConfirmationInput(e.target.value)} placeholder='Confirm Password' value={passwordConfirmationInput} />


      <button onClick={handleRegister} >Submit</button>
      </main>
      <main className='loggingIn' >
      
      </main>

    </div>
  )
};

const mapStateToProps = (reduxState) => reduxState

  export default connect(mapStateToProps, { getUser, registerView })(Authentication);
