import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import './director-view.scss';

import { MovieCard } from '../movie-card/movie-card';

export class DirectorView extends React.Component {

  render () {

    const { director, onBackClick } = this.props;

    return (
      <Container className="director-view">
        {/* Need to add images to database
        <Row className="director-photo justify-content-md-center">
          <Image crossOrigin="anonymous" src={movie.director.imageURL} />
        </Row> */}
        <Row className="director-name justify-content-md-center">
          <Col md={8} className="header">{director.name}</Col>
        </Row>
        <Row className="director-bio justify-content-md-center">
          <Col md={8} className="director-info">Bio: {director.bio}</Col>
        </Row>
        <Row className="director-birth justify-content-md-center">
          <Col md={8} className="director-info">Born: {director.birth}</Col>
        </Row>
        <Row className="director-death justify-content-md-center">
          <Col md={8} className="director-info">Died: {director.death ? `${director.death}` : 'n/a'}</Col>
        </Row>
        <Row className="director-movies-header justify-content-md-center">
          <Col md={8} className="sub-header">{director.name}'s Movies</Col>
        </Row>
        {/* Tried to figure out a way to get DirectorView to display MovieCard view for movies of that director */}
        {/* <Row>
          <Col md={3}>  
            {movies.map((movie) => {
              if (director.name)
              return <MovieCard key={movie._id} movie={movie} />
            })}
          </Col>
        </Row> */}
        <Row className="justify-content-md-center">
          <Button onClick={() => {onBackClick();}}>Back</Button>
        </Row>
      </Container>
    )
  }
}