import React from 'react';
import { Container, Row, Col, Button, Card, Link} from 'react-bootstrap';
import './genre-view.scss';

export class GenreView extends React.Component {

    getMovieTitle() {
    const {movies} = this.props;
    const {genre} = this.props;
    return movies.filter(movie => movie.genre.name === genre.name)[0] || null
  }

  render () {
    const { movies, genre, onBackClick } = this.props;

    const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

    return (
      <Container>
        <Row className="genre-name justify-content-md-center">
          <Col md={8} className="header"><h4>{capitalize(genre.name)}</h4></Col>
        </Row>
        
        <Row className="genre-description justify-content-md-center">
          <Col md={8} className="genre-info">Description: {genre.description}</Col>
        </Row>
        
        <Row className="genre-movies-header justify-content-md-center">
          <Col md={8} className="sub-header"><h6>{capitalize(genre.name)} Movies</h6></Col>
        </Row>
        
        <Row className="justify-content-md-center">
          {movies.map(() => {
            const movie = this.getMovieTitle();
            console.log(movie);
            return (
              <Col md={4} key={movie._id}>
                <Card>
                  {/* <Link to={`/movies/${movie._id}`}> */}
                    <Card.Img crossOrigin="anonymous" src={movie.imageURL} />
                  {/* </Link> */}
                </Card>
              </Col>
            )
          })}
        </Row>
        
        <Row className="justify-content-md-center">
          <Button onClick={() => {onBackClick();}}>Back</Button>
        </Row>
      </Container>
    )
  }
}