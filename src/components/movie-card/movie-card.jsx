import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    
    return (
      <Card className="movie-card">
        <Card.Img crossOrigin="anonymous" variant="top" width="100px" src={movie.imageURL} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
          {/* <Button onClick={() => {onFavorite();}}>Add to your favorites</Button> */}
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