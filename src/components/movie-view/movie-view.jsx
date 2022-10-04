import React from 'react';
import { Button, Card } from 'react-bootstrap';
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
        <Card.Text>{movie.description}</Card.Text>
          <Card.Text>
            Director:
            <Link to={`/directors/${movie.director.name}`}>
              <Button variant="link">{movie.director.name}</Button>
            </Link>
          </Card.Text>
          <Card.Text>
            Genre: 
            <Link to={`/genres/${movie.genre.name}`}>
              <Button variant="link">{capitalize(movie.genre.name)}</Button>
            </Link>
          </Card.Text>
          <Card.Text>
            <Button onClick={() => {onBackClick();}}>Back</Button>
          </Card.Text>
          {/* Only allowing this as an option in profile view for now
          <p>
            <Button variant="primary" onClick={this.removeFavorite}>Unfavorite</Button>
          </p> */}
        </Card.Body>
      </Card>
    )
  }
}