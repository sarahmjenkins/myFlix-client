import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  getMovies(token) {
    axios.get('https://myflixbysarah.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // state of selectedMovie property updated to the movie that the user clicks on
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  // user property is updated when a user logs in to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });

    localStorate.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }
  
  render() {
    const { movies, selectedMovie, user } = this.state;

    // LoginView renders if no user is logged in, but if a user is logged in, user details are passed as prop to LoginView
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />


    if (movies.length === 0) return <div className="main-view" />;
    
    return (
    // if state of selectedMovie is not null, that selected movie will be returned otherwise a full list will be returned
      <div className="main-view">
        <Row className="justify-content-md-center">
          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie);}} />
              </Col>
            )
            : movies.map(movie => (
              <Col key={movie._id} md={3}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie);}} />
              </Col> 
            ))
          }
        </Row>
        <Row className="justify-content-md-center">
            <Button>Register Here</Button>
        </Row>
      </div>
    );
  }
}

export default MainView;