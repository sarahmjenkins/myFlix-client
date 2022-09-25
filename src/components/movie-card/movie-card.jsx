import React from 'react';
import axios from'axios';
import PropTypes from 'prop-types';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';

export class MovieCard extends React.Component {
  constructor(){
    super()
    this.addFavorite = this.addFavorite.bind(this)
    // this.removeFavorite = this.removeFavorite.bind(this)
  }
  // add favorite movie
  addFavorite(e) { 
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const {movie} = this.props;
    e.preventDefault();
    axios.post(`https://myflixbysarah.herokuapp.com/users/${username}/movies/${movie._id}`, null, {
      headers: { 
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response.data);
      alert(`${movie.title} was added to your favorites!`);
    })
    .catch(error => {
      console.log(error);
      alert(`Unable to add ${movie.title} to your favorites.`)
    });
  }

  // remove favorite movie--keeping this as only an option in profile view until I add a toggle to show if movies are favorited
  // removeFavorite(e) {
  //   const username = localStorage.getItem('user');
  //   const token = localStorage.getItem('token');
  //   const {movie} = this.props;
  //   e.preventDefault();
  //   axios.delete(`https://myflixbysarah.herokuapp.com/users/${username}/movies/${movie._id}`, {
  //     headers: { Authorization: `Bearer ${token}`}
  //   })
  //   .then(() => {
  //     alert(`${movie.title} was successfully removed from your favorites.`);
  //   })
  //   .catch(response => {
  //     console.error(response);
  //     alert(`Unable to remove ${movie.title} from your favorites.`)
  //   })
  // };

  render() {
    const { movie } = this.props;
    
    return (
      <Card className="movie-card">
        <Card.Img crossOrigin="anonymous" variant="top" src={movie.imageURL} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">About this movie</Button>
            </Link> 
          </Card.Text>
          <Card.Text>
            <Button variant="primary" value={movie._id} onClick={this.addFavorite}>Favorite</Button>
            {/* Only allowing this as an option in profile view for now
              <Button variant="primary" onClick={this.removeFavorite}>Unfavorite</Button>
            */}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired
  }).isRequired
}