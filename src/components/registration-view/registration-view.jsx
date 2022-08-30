import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email);
    props.onRegistered(user)
  };

  return(
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange = {e => setUsername(e.target.value)} />
      </label>
        Password:
        <input type="text" value={password} onChange = {e => setPassword(e.target.value)} />
      <label>
        Email:
        <input type="text" value={email} onChange = {e => setEmail(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  onRegistration: PropTypes.func.isRequired
}