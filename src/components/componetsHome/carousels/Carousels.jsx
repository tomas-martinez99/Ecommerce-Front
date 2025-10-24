import React from 'react'
import PropTypes from 'prop-types'
import Carousel from 'react-bootstrap/Carousel';
import carrusel01 from '/public/carouselsImg/carrusel01.jpg'
import carrusel02 from '/public/carouselsImg/carrusel02.jpg'


const Carousels = () => {
    return (
    <Carousel>
      <Carousel.Item>
       <img
        src={carrusel01}
        alt="First slide"
        style={{ width: '1920px', height: '760px', objectFit: 'cover' }}/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
        src={carrusel02}
        alt="Second slide"
        style={{ width: '1920px', height: '760px', objectFit: 'cover' }}/>
        
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}


Carousels.propTypes = {}

export default Carousels