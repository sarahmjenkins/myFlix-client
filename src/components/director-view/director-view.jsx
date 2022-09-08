import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-boostrap/Image';
import './director-view.scss';

export class DirectorView extends React.Component {
  render () {
    const { movie } = this.props;

    return (
      <Container className="director-view">
        {/* Need to add images to database
        <Row className="director-photo justify-content-md-center">
          <Image crossOrigin="anonymous" src={movie.director.imageURL} />
        </Row> */}
        <Row className="director-name justify-content-md-center">
          <Col md={2} className="label">Name:</Col>
          <Col md={10} className="value">{movie.director.name}</Col>
        </Row>
        <Row className="director-bio justify-content-md-center">
          <Col md={2} className="label">Bio:</Col>
          <Col md={10} className="value">{movie.director.bio}</Col>
        </Row>
        <Row className="director-birth justify-content-md-center">
          <Col md={2} className="label">Born:</Col>
          <Col md={10} className="value">{movie.director.birth}</Col>
        </Row>
        <Row className="director-death justify-content-md-center">
          <Col md={2} className="label">Died:</Col>
          <Col md={10} className="value">{movie.director.death}</Col>
        </Row>
        <Row className="justify-content-md-center">
          <Button onClick={() => {onBackClick();}}>Back</Button>
        </Row>
      </Container>
    )
  }
}