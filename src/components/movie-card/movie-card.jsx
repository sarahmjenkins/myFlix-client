import React from 'react';
import axios from'axios';
import PropTypes from 'prop-types';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';

export class MovieCard extends React.Component {

  // add favorite movie
  addFavorite(e) { 
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const {movie} = this.props;
    e.preventDefault();
    axios.post(`https://myflixbysarah.herokuapp.com/users/${username}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log(response.data);
      alert(`${movie.Title} was added to your favorites!`);
    })
    .catch(error => {
      console.log(error);
      alert(`Unable to add ${movie.Title} to your favorites.`)
    });
  }

  // remove favorite movie
  removeFavorite(e) {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const {movie} = this.props;
    e.preventDefault();
    axios.delete(`https://myflixbysarah.herokuapp.com/users/${username}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response =>
      alert(`${movie.Title} was successfully removed from your favorites.`),
    )
    .catch(response =>
      console.error(response),
      alert(`Unable to remove ${movie.Title} from your favorites.`)
    )
  };

  render() {
    const { movie } = this.props;
    
    return (
      <Card className="movie-card">
        <Card.Img crossOrigin="anonymous" variant="top" width="100px" src={movie.imageURL} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <ListGroup>
            <ListGroup.Item>
              <Link to={`/movies/${movie._id}`}>
                <Button variant="link">About this movie</Button>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              {/* <label className="switch">
                <input type="checkbox" />
                <span className="slider" />
              </label> */}
              <Button variant="primary" value={movie._id} onClick={e => this.addFavorite(e, movie)}>Favorite</Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="primary" onClick={e => this.removeFavorite(e)}>Unfavorite</Button>
            </ListGroup.Item>
          </ListGroup>
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