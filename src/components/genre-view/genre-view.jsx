import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';

import { MovieCard } from '../movie-card/movie-card';

export class GenreView extends React.Component {

  render () {
    const { genre, onBackClick } = this.props;

    const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

    return (
      <Container>
        <Row className="genre-name justify-content-md-center">
          <Col md={8} className="header">{capitalize(genre.name)}</Col>
        </Row>
        <Row className="genre-description justify-content-md-center">
          <Col md={8} className="genre-info">Description: {genre.description}</Col>
        </Row>
        <Row className="genre-movies-header justify-content-md-center">
          <Col md={8} className="sub-header">{capitalize(genre.name)} Movies</Col>
        </Row>
        {/* Tried to figure out a way to get GenreView to display MovieCard view for movies of that genre */}
        {/* <Row>
          <Col md={3}>  
            {{movies.map((movie) => {
              if (genre.name)
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