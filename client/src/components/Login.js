import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function LoginPage() 
{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleLogin(event)
  {
    event.preventDefault();
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
    navigate('/Main');
  }

  return (
    <div className="Login">
    <h1 >Plate it!</h1>
    <form onSubmit={handleLogin}>
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
      <button type="submit">Login</button>
      <button type="submit">Sign Up</button>
    </form>
    </div>
  );
}

export default LoginPage;