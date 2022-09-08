import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/button';
import Card from 'react-bootstrap/card';
import { Link} from 'react-router-dom';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    
    return (
      <Card className="movie-card">
        <Card.Img crossOrigin="anonymous" variant="top" width="100px" src={movie.imageURL} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
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
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
}