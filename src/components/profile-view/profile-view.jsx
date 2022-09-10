import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: null
    };
  }

  // Get profile information to display on profile page
  getUser() {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.get(`https://myflixbysarah.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        username: response.data.username,
        password: response.data.password,
        email: response.data.email,
        bithday: response.data.birthday,
        favoriteMovies: response.data.favoriteMovies
      });
    })
    .catch(error => {
      console.log(error);
    });
  };

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getUser(accessToken);
    }
  }

  // edit user info
  validate() {
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
  
  editUser(e) {
    e.preventDefault();
    const isReq = validate();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.put(`https://myflixbysarah.herokuapp.com/users/${username}`, {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      bithday: this.state.birthday
    }, {headers: { Authorization: `Bearer ${token}`}})
    .then(response => {
      this.setState({
        username: response.data.username,
        password: response.data.password,
        email: response.data.email,
        bithday: response.data.birthday
      });
      alert('Update successful.');
      localStorage.setItem('user', this.state.username);
      window.open(`/users/${username}`, '_self');
    })
    .catch(response => {
      console.error(response);
      alert('unable to update profile');
    })
  };

  // // delete user
  deleteUser(e) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.delete(`https://myflixbysarah.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      alert('Your profile was deleted.')
      localStorage.clear();
      window.open('/', '_self');
    })
    .catch(response => {
      console.error(response);
      alert('unable to delete profile');
    })
  };

  setUsername(updatedUsername) {
    this.username = updatedUsername;
  }

  setPassword(updatedPassword) {
    this.password = updatedPassword;
  }

  setEmail(updatedEmail) {
    this.email = updatedEmail;
  }

  setBirthday(updatedBirthday) {
    this.birthday = updatedBirthday;
  }

  render () {

    const { username, email, birthday, favoriteMovies, usernameErr, passwordErr, emailErr, editUser, deleteUser } = this.state;

    return ( 
      <Container className="profile-view">
          {/* Want existing user data to show up in form */}
          <h1>View and update user information</h1>
          <Form>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
                <Form.Control type="text" placeholder={username} onChange = {e => this.setUsername(e.target.value)} required />
                {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="****" onChange = {e => this.setPassword(e.target.value)} required minLength="4" />
                {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Birthday:</Form.Label>
                <Form.Control type="date" placeholder={birthday} onChange={e => this.setBirthday(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder={email} onChange={e => this.setEmail(e.target.value)} required />
                {emailErr && <p>{emailErr}</p>}
            </Form.Group>
            
            <Button variant="primary" type="submit" onClick={editUser}>Update profile</Button>
            <Button onClick={deleteUser}>Delete profile</Button>
          </Form>

          <h1>Favorite Movies</h1>
          <Row>
            <Col>
              {favoriteMovies ? `${favoriteMovies}` : 'You don\'t have any favorite movies yet'}
            </Col>
          </Row>
        </Container>
    );
  }
}