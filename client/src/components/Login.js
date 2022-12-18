import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import '../styles/Login.css';
function  LoginPage()
{
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let [error, setError] = useState('');
  const navigate = useNavigate();
  
  async function checkLogin(){
    let response = await fetch(`/getUser/${username}/${password}`)
    let responseJson = await response.json().catch(error => {
      setError('wrong username and password');
      console.log(error)
    });
    if(responseJson){
      localStorage.setItem("username", username);
      navigate('/Main')
    }
  } 
  const  handleLogin= (event)=>
  {
    if(username === '' && password === '')
    {
      setError('Error: Username and Password cannot be empty'); // set error message
      return;
    }else if(username === ''){
      setError('Error: Username cannot be empty'); // set error message
      return;
    }else if(password === ''){
      setError('Error: Password cannot be empty'); // set error message
      return;
    }
    checkLogin();
    
    event.preventDefault();
    
    
  }
  async function handleSignUp(event){
    event.preventDefault();
    let isError = false
    let response = await fetch(`/findUser/${username}`)
    await response.json().catch(error => {
      isError = true;
    });
    if(isError){
      const request = {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'username': username, 'password':password})
    };
    fetch(`/makeNewUser`,request)
    localStorage.setItem("username", username);
    navigate('/Main');
  }
  
}

  return (
    <div className="Login">
    <h1 >Plate it!</h1>
    <form>
      {error && <p className="error">{error}</p>} 
      {/* show error message if there is an error */}
      <label>
        Username: 
        <input
          type="text"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </label>
      <label>
        Password: 
        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </label>
      <button onClick = {handleLogin} type="submit">Login</button>
      <button onClick = {handleSignUp} type="submit">Sign Up</button>
    </form>
    </div>
  );
}

export default LoginPage;