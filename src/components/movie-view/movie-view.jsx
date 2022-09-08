import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-boostrap/Image';
import './movie-view.scss';

export class MovieView extends React.Component {
  
  render() {
    const { movie, onBackClick } = this.props;

    return ( 
      <Container className="movie-view">
        <Row className="movie-poster justify-content-md-center">
          <Image crossOrigin="anonymous" width="200px" src={movie.imageURL} />
        </Row>
        <Row className="movie-title justify-content-md-center">
          <Col md={2} className="label">Title: </Col>
          <Col md={10} className="value">{movie.title}</Col>
        </Row>
        <Row className="movie-description justify-content-md-center">
          <Col md={2} className="label">Description: </Col>
          <Col md={10} className="value">{movie.description}</Col>
        </Row>
        <Row className="justify-content-md-center">
          <Button onClick={() => {onBackClick();}}>Back</Button>
        </Row>
        <Row className="justify-content-md-center">
          <Link to={`/directors/${movie.director.name}`}>
            <Button variant="link">Director</Button>
          </Link>
        </Row>
        <Row className="justify-content-md-center">
          <Link to={`/genres/${movie.genre.name}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </Row>
      </Container>
    );
  }
}