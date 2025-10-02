import React from 'react';
import { Card, Row, Col, Badge, Button, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './ProductList.css';

const products = [{ id: 1, name: 'Kit de plastico smash negro', price: 100, img: '/src/productImg/1081.jpg' },
{ id: 2, name: 'Kit de plastico smash azul bitono', price: 200, img: '/src/productImg/1081A.jpg' },
{ id: 3, name: 'Kit transmision riffel CG150', price: 300, img: '/src/productImg/70766.jpg' },
{ id: 4, name: 'Bateria ritsuka', price: 400, img: '/src/productImg/bateria ritsuka.jpg' },
{ id: 5, name: 'Camara ritsuka', price: 500, img: '/src/productImg/camara ritsuka.jpg' },
{ id: 6, name: 'Funda asiento antideslisante para 110 Negra', price: 600, img: '/src/productImg/FV015.jpg' },
{ id: 7, name: 'Funda asiento antideslisante para 110 Azul', price: 600, img: '/src/productImg/FV015A.jpg' },
{ id: 8, name: 'Funda asiento antideslisante para 110 Blanco', price: 600, img: '/src/productImg/FV015B.jpg' },]
const ProductList = () => (
  <Row >
    <Col
      md={2}
      className="menu-lateral"
    >
      <Nav className="flex-column pt-4 w-100 " >
        <Button variant="link" href="#category1" className="menu-link">Categoría 1</Button>
        <Button variant="link" href="#category1" className="menu-link">Categoría 2</Button>
        <Button variant="link" href="#category1" className="menu-link">Categoría 3</Button>
        <Button variant="link" href="#category1" className="menu-link">Categoría 4</Button>
      </Nav>
    </Col>
    <Col md={10}>
      <Row style={{ paddingTop: '130px' }}>
        {products.map(product => (
          <Col key={product.id} md={4} className="mb-4">
            <Card className="product-card h-100">
              <div className="position-relative">
                {product.discount && (
                  <Badge bg="warning" className="discount-badge">
                    {product.discount}% OFF
                  </Badge>
                )}
                <Card.Img
                  variant="top"
                  src={product.img}
                  alt={product.name}
                  style={{ height: '180px', objectFit: 'contain', background: '#fff', padding: '16px' }}
                />
              </div>
              <Card.Body>
                {product.oldPrice && (
                  <div className="text-muted text-decoration-line-through small mb-1">
                    {product.oldPrice}
                  </div>
                )}
                <Card.Text className="fw-bold fs-5 mb-1">{product.price}</Card.Text>
                <Card.Title className="fs-6 mb-2">{product.name}</Card.Title>
                {product.freeShipping && (
                  <Badge bg="success" className="mb-2">Envío gratis</Badge>
                )}
                <Button variant="outline-dark" className="w-100 mt-2">Agregar al carrito</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  </Row>
);

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductList;