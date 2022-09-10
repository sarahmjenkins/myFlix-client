import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {
  
  render() {
    const { movie, onBackClick } = this.props;

    const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

    return ( 
      <Container className="movie-view">
        <Row className="movie-poster justify-content-md-center">
          <Image crossOrigin="anonymous" width="200px" src={movie.imageURL} />
        </Row>
        <Row className="movie-title justify-content-md-center">
          <Col md={8} className="header">{movie.title}</Col>
        </Row>
        <Row className="movie-description justify-content-md-center">
          <Col md={8} className="movie-info">Description: {movie.description}</Col>
        </Row>
        <Row className="movie-director justify-content-md-center">
          <Col md={8} className="movie-info">
            Director: 
            <Link to={`/directors/${movie.director.name}`}>
              <Button variant="link">{movie.director.name}</Button>
            </Link>
          </Col>
          
        </Row>
        <Row className="movie-genre justify-content-md-center">
          <Col md={8} className="movie-info">
            Genre: 
            <Link to={`/genres/${movie.genre.name}`}>
              <Button variant="link">{capitalize(movie.genre.name)}</Button>
            </Link>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Button onClick={() => {onBackClick();}}>Back</Button>
        </Row>
      </Container>
    );
  }
}