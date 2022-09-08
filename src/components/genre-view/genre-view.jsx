import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';

export class GenreView extends React.Component {
  render () {
    const { movie } = this.props;

    return (
      <Container>
        <Row className="genre-name justify-content-md-center">
          <Col md={2} className="label">Genre:</Col>
          <Col md={10} className="value">{movie.genre.name}</Col>
        </Row>
        <Row className="genre-description justify-content-md-center">
          <Col md={2} className="label">Description:</Col>
          <Col md={10} className="value">{movie.genre.description}</Col>
        </Row>
        <Row className="justify-content-md-center">
          <Button onClick={() => {onBackClick();}}>Back</Button>
        </Row>
      </Container>
    )
  }
}