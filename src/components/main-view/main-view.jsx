import React from 'react';
import axios from 'axios';

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

  componentDidMount() {
    axios.get('https://myflixbysarah.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // state of selectedMovie property updated to the movie that the user clicks on
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  // user property is updated when a user logs in to that particular user
  onLoggedIn(user) {
    this.setState({
      user
    });
  }
  
  render() {
    const { movies, selectedMovie, user } = this.state;

    // LoginView renders if no user is logged in, but if a user is logged in, user details are passed as prop to LoginView
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />


    if (movies.length === 0) return <div className="main-view" />;
    
    return (
      <div className="main-view">
        {/* if state of selectedMovie is not null, that selected movie will be returned otherwise a full list will be returned */}
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie);}} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => {this.setSelectedMovie(movie)}} />
          ))
        }
        <button>Register Here</button>
      </div>
    );
  }
}

export default MainView;