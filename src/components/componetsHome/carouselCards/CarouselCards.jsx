import React from 'react'
import PropTypes from 'prop-types'
import { Carousel, Card, Row, Col,Badge } from 'react-bootstrap';
import './CarouselCards.css';

const chunkArray = (arr, size) =>
    arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);

const CarouselCards = ({ products }) => {
    const productsPerSlide = 4;
    const slides = chunkArray(products, productsPerSlide);

    return (
        <Carousel>
            {slides.map((group, idx) => (
                <Carousel.Item key={idx}>
                    <Row className="justify-content-center">
                        {group.map(product => (
                            <Col key={product.id} md={3}>
                                <Card className="mb-4 product-card-custom">
                                    <div className="position-relative">
                                        {/* Badge de descuento */}
                                        <Badge bg="warning" className="discount-badge">5% OFF</Badge>
                                        <Card.Img
                                            variant="top"
                                            src={product.img}
                                            alt={product.name}
                                            style={{ height: '180px', objectFit: 'contain', background: '#fff', padding: '16px' }}
                                        />
                                    </div>
                                    <Card.Body>
                                        {/* Precio tachado */}
                                        <div className="text-muted text-decoration-line-through small mb-1">${product.price*1.20}</div>
                                        {/* Precio actual */}
                                        <Card.Text className="fw-bold fs-5 mb-1">${product.price}</Card.Text>
                                        {/* Nombre */}
                                        <Card.Title className="fs-6 mb-2">{product.name}</Card.Title>
                                        {/* Botón */}
                                        <button className="btn btn-outline-dark w-100">Agregar al carrito</button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Carousel.Item>
            ))}
        </Carousel>

    )
}

CarouselCards.propTypes = {
    products: PropTypes.array.isRequired
}

export default CarouselCards