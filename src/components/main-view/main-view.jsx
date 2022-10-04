import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import ProfileView from '../profile-view/profile-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { Navbar } from '../navbar/navbar';
import './main-view.scss';

class MainView extends React.Component {
  
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflixbysarah.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setMovies(response.data);
      this.props.setUser(localStorage.getItem('user'));
    })
    .catch(error => {
      console.log(error);
    });
  }

  // user property is updated when a user logs in to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user.username);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  // remove token and user from local storage and clear user state when logging out
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser('');
  }
  
  render() {
    const { movies, user } = this.props;
    console.log({movies, user});
    return (
      <Router>
        <Navbar user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            {/* path renders the login view if nobody is logged in or moviecard view if they are */}
            <Route exact path="/" render={() => {
              if (!user) return <Col>
                <LoginView movies={movies} onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length == 0) return <div className="main-view" />;
              return <MoviesList movies={movies} />
            }} />
            
            {/* path redirects to "/" if a user is logged in, otherwise the registration view will render */}
            <Route exact path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col lg={8} md={8}>
                <RegistrationView />
              </Col>
            }} />
            
            {/* path renders movie view of movie with specific id */}
            <Route exact path="/movies/:movieId" render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              if (movies.length == 0) return <div className="main-view" />;
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            
            {/* path renders details of selected genre */}
            <Route exact path="/genres/:name" render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              if(movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView movies={movies} genre={movies.find(m => m.genre.name === match.params.name).genre} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            
            {/* path renders details of selected director */}
            <Route exact path="/directors/:name" render={ ({ match, history }) => {
              if (!user) return <Redirect to="/" />
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView movies={movies} director={movies.find(m => m.director.name === match.params.name).director} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            {/* path renders user's info */}
            <Route exact path={`/users/${user}`} render={({ history }) => {
              if (!user) return <Redirect to="/" />
              return <Col md={8}>
                <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()} />
              </Col>            
            }} />
          </Row>
        </Container>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  console.log({state})
  return { 
    movies: state.movies,
    user: state.user 
  }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);