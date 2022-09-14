import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {
      directorMovies: [],
    };
  }

  componentDidMount() {
    const filteredMovies = this.getMovieTitle();
    this.setState({
      directorMovies: filteredMovies,
    });
  }

  getMovieTitle() {
    const {movies} = this.props;
    const {director} = this.props;
    return movies.filter(movie => movie.director.name === director.name);
  }
  
  render () {

    const { director, onBackClick } = this.props;

    return (
      <Container className="director-view">
        {/* Need to add images to database
        <Row className="director-photo justify-content-md-center">
          <Image crossOrigin="anonymous" src={movie.director.imageURL} />
        </Row> */}
        <Row className="director-name justify-content-md-center">
          <Col md={8} className="header"><h4>{director.name}</h4></Col>
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
          <Col md={8} className="sub-header"><h6>{director.name}'s Movies</h6></Col>
        </Row>

        <Row className="justify-content-md-center">
          {this.state.directorMovies.map(movie => {
            return (
              <Col md={4} key={movie._id}>
                <Card>
                  <Link to={`/movies/${movie._id}`}>
                    <Card.Img crossOrigin="anonymous" src={movie.imageURL} />
                  </Link>
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