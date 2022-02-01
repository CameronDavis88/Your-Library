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

  return (
    <div>
      This is the Authentication component


    </div>
  )
};

export default Authentication;
