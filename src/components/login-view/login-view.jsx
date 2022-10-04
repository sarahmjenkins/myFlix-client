import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  // declare hooks for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if(!username){
      setUsernameErr('Username required');
      isReq = false;
    } else if(username.length < 5) {
      setUsernameErr('Username must be 5 characters long');
      isReq = false;
    }
    if(!password){
      setPasswordErr('Password required');
      isReq = false;
    } else if(password.length < 4){
      setPasswordErr('Password must be 4 characters long');
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      // send a request to server for authentication
      axios.post('https://myflixbysarah.herokuapp.com/login', {
        username: username,
        password: password
      })
      .then(response => {
        const data = response.data
        props.onLoggedIn(data);
        return
      })
      .catch(e => {
        console.log(e, 'no such user')
      })
    }
  };

  return(
    <div className="login-view">
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
          {usernameErr && <p>{usernameErr}</p>}
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
          {passwordErr && <p>{passwordErr}</p>}
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>Log In</Button>
      </Form>
    </div>
  )
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}