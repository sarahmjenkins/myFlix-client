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
      favoriteMovies: []
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
        birthday: response.data.birthday,
        favoriteMovies: response.data.favoriteMovies
      });
      console.table(response.data);
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
    if(!this.updatedUsername){
      setUsernameErr('Username required');
      isReq = false;
    } else if(this.updatedUsername.length < 5) {
      setUsernameErr('Username must be at least 5 characters long');
      isReq = false;
    }

    if(!this.updatedPassword){
      setPasswordErr = 'Password required';
      isReq = false;
    } else if(this.updatedPassword.length < 4) {
      setUsernameErr = 'Password must be at least 4 characters long';
      isReq = false;
    }

    if(!this.updatedEmail){
      setEmailErr = 'Email required';
      isReq = false;
    } else if (this.updatedEmail.indexOf('@') === -1) {
      setEmailErr = 'Valid email required';
      isReq = false;
    }

    return isReq;
  };
  
  editUser(e) {
    e.preventDefault();
    // const isReq = this.validate();
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
      console.table(response.data);
      window.open(`/users/${this.username}`, '_self');
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
      alert('Unable to delete profile');
    })
  };

  setUsername(updatedUsername) {
    this.setState({
      username: updatedUsername,
    });
    this.username = updatedUsername;
  }

  setPassword(updatedPassword) {
    this.setState({
      password: updatedPassword,
    });
    this.password = updatedPassword;
  }

  setEmail(updatedEmail) {
    this.setState({
      email: updatedEmail,
    });
    this.email = updatedEmail;
  }

  setBirthday(updatedBirthday) {
    this.setState({
      birthday: updatedBirthday,
    });
    this.birthday = updatedBirthday;
  }

  render () {

    const { username, email, birthday, favoriteMovies } = this.state;

    return ( 
      <Container className="profile-view">
        <h1>Your profile information</h1>
        <Row>
          <Col md={8}>Username: {username}</Col>
        </Row>
        <Row>
          <Col md={8}>Email: {email}</Col>
        </Row>
        <Row>
          <Col md={8}>Birthday: {birthday}</Col>
        </Row>
        
        <h1>Your favorite movies</h1>
        <Row>
          <Col>
            {favoriteMovies ? `${favoriteMovies}` : 'You don\'t have any favorite movies yet'}
          </Col>
        </Row>

        <h1>Delete your profile</h1>
        <Button onClick={e => this.deleteUser(e)}>Delete profile</Button>

        <h1>Update your profile information</h1>
        <Form className="update-form" onSubmit={(e) => this.editUser(e, this.username, this.password, this.email, this.birthday)}>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
              <Form.Control type="text" placeholder="Update your username" onChange = {e => this.setUsername(e.target.value)} required />
              {this.usernameErr && <p>{this.usernameErr}</p>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Update your password" onChange = {e => this.setPassword(e.target.value)} required minLength="4" />
              {this.passwordErr && <p>{this.passwordErr}</p>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Birthday:</Form.Label>
              <Form.Control type="date" onChange={e => this.setBirthday(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="Update your email" onChange={e => this.setEmail(e.target.value)} required />
              {this.emailErr && <p>{this.emailErr}</p>}
          </Form.Group>
          
          <Button variant="primary" type="submit" onClick={e => this.editUser(e)}>Update profile</Button>
        </Form>
      </Container>
    );
  }
}