
  
  // const Registering = () => {
  //   return (
  //     <main className='registering'>
  //       <h2>Create an account Below</h2>
  //       <br />
  //       <button onClick={() => setRegisterView(false)} >Back to Login</button>
  //       <br />
  //       <input onChange={(e) => setUsernameInput(e.target.value)} placeholder='Username' value={usernameInput} />
  //       <input onChange={(e) => setEmailInput(e.target.value)} placeholder='Email' value={emailInput} />
  //       <input onChange={(e) => setPasswordInput(e.target.value)} placeholder='Password' value={passwordInput} />
  //       <input onChange={(e) => setPasswordConfirmationInput(e.target.value)} placeholder='Confirm Password' value={passwordConfirmationInput} />
  //       <button onClick={handleRegister} >Create Account</button>
  //     </main>
  //   )
  // };

  // const LoggingIn = () => {
  //   return (
  //     <main className='loggingIn' >
  //       <h2>Login Below</h2>
  //       <br />
  //       <input onChange={(e) => setEmailInput(e.target.value)} placeholder='Email' value={emailInput} />
  //       <input onChange={(e) => setPasswordInput(e.target.value)} placeholder='Password' value={passwordInput} />
  //       <button onClick={handleLogin} >Login</button>
  //       <h4>Don't have an account yet?</h4> <button onClick={() => setRegisterView(true)} >Create Account Here</button>
  //     </main>
  //   )
  // };

  // const UpdatingUser = () => {
  //   return (
  //     <div className='updating-user' >
  //       <h2>Update your information</h2>
  //       <h4>Whatever value you leave blank will remain the same as before</h4>
  //       <input onChange={(e) => setUsernameInput(e.target.value)} placeholder='New Username' value={usernameInput} />
  //       <input onChange={(e) => setEmailInput(e.target.value)} placeholder='New Email' value={emailInput} />
  //       <input onChange={(e) => setPasswordInput(e.target.value)} placeholder='New Password' value={passwordInput} />
  //       <input onChange={(e) => setPasswordConfirmationInput(e.target.value)} placeholder='Confirm New Password' value={passwordConfirmationInput} />
  //       <br />
  //       <input onChange={(e) => setOldPasswordInput(e.target.value)} placeholder='Confirm CURRENT Password' value={oldPasswordInput} />
  //       <button onClick={updateUsersInfo} >Submit Edits</button>
  //       <button onClick={() => setUpdatingView(false)} >Cancel/back</button>
  //     </div>
  //   )
  // };

  // const Profile = () => {
  //   return (
  //     <div className='profile' >
  //       <h1>Your Account</h1>
  //       <br />
  //       <h3> Your Username : {username}</h3>
  //       <h3>Your Email: {email}</h3>
  //       <button onClick={() => setUpdatingView(true)} >Edit Your Account Information</button>
  //       <button onClick={() => setDeletingView(true)} >Delete Account</button>
  //     </div>
  //   )
  // }

  // const DeletingUser = () => {
  //   return (
  //     <div className='deleting-account'>
  //       <input onChange={(e) => setPasswordInput(e.target.value)} placeholder='Password' value={passwordInput} />
  //       <input onChange={(e) => setPasswordConfirmationInput(e.target.value)} placeholder='Confirm Password' value={passwordConfirmationInput} />
  //       {checkingView === false ?
  //         <>
  //           <button onClick={() => setCheckingView(true)}>Delete Account</button>
  //           <button onClick={() => {
  //             setCheckingView(false)
  //             setDeletingView(false)
  //           }} >Cancel/Back</button>
  //         </>
  //         :
  //         <>
  //           <h2>Are you sure you want to delete your account?</h2>
  //           <button onClick={deleteUsersAccount} >Yes, delete my account</button>
  //           <button onClick={() => setCheckingView(false)} >No, cancel</button>
  //         </>
  //       }
  //     </div>
  //   )
  // };
