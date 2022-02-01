import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  const handleRegister = () => {
    // const { username, email, password, verPassword } = this.state;
    const newUser = {
      username: usernameInput,
      password: passwordInput,
      email: emailInput,
    }

    if (passwordInput === passwordConfirmationInput) {
      axios.post('/api/register', newUser)
        .then(res => {
          // props.getUser(res.data);
          // props.history.push('/users_library');
          alert("Congratulations, you're all registered!");
        })
        .catch(err => console.log(err));
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <div>
      This is the Authentication component


    </div>
  )
};

export default Authentication;
