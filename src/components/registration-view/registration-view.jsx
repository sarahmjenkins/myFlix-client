import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './registration-view.scss';

export function RegistrationView() {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const validate = () => {
    let isReq = true;
    if(!username){
      setUsernameErr('Username required');
      isReq = false;
    } else if(username.length < 5) {
      setUsernameErr('Username must be at least 5 characters long');
      isReq = false;
    }
    if(!password){
      setPasswordErr('Password required');
      isReq = false;
    } else if(password.length < 4) {
      setUsernameErr('Password must be at least 4 characters long');
      isReq = false;
    }
    if(!email){
      setEmailErr('Email required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Valid email required');
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      axios.post('https://myflixbysarah.herokuapp.com/users', {
        username: username,
        password: password,
        email: email,
        birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        alert('Registration successful. Please sign in.');
        window.open('/', '_self');
      })
      .catch(response => {
        console.error(response);
        alert('unable to register');
      })
    }
  };

  return(
    <Form>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} placeholder="Enter a username" onChange = {e => setUsername(e.target.value)} required />
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>

      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} placeholder="Enter a password" onChange = {e => setPassword(e.target.value)} required minLength="4" />
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>

       <Form.Group>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date" placeholder="Enter your birthdate" onChange = {e => setBirthday(e.target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={email} placeholder="Enter your email address" onChange = {e => setEmail(e.target.value)} required />
        {emailErr && <p>{emailErr}</p>}
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
    </Form>
  );
}