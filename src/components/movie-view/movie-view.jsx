import React from 'react';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {
  
  render() {
    const { movie, onBackClick } = this.props;

    const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

    return ( 
      
      <Card className="movie-view">
        <Card.Img crossOrigin="anonymous" variant="top" src={movie.imageURL} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>
            <p>{movie.description}</p>
            <p>
              Director:
              <Link to={`/directors/${movie.director.name}`}>
                <Button variant="link">{movie.director.name}</Button>
              </Link>
            </p>
            <p>
              Genre: 
              <Link to={`/genres/${movie.genre.name}`}>
                <Button variant="link">{capitalize(movie.genre.name)}</Button>
              </Link>
            </p>
            <p>
              <Button variant="primary" value={movie._id} onClick={this.addFavorite}>Favorite</Button>
            </p>
            <p>
              <Button onClick={() => {onBackClick();}}>Back</Button>
            </p>
            {/* Only allowing this as an option in profile view for now
            <p>
              <Button variant="primary" onClick={this.removeFavorite}>Unfavorite</Button>
            </p> */}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}