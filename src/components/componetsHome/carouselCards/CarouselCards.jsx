import React from 'react'
import PropTypes from 'prop-types'
import { Carousel, Card, Row, Col, Badge, Spinner, Button } from 'react-bootstrap';
import './CarouselCards.css';

const DEFAULT_IMG = '/public/productImg/ImgDefault.jpg';
const chunkArray = (arr = [], size = 4) => {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
 return chunks;
};



const CarouselCards = ({ products = [], loading = false, error = null, productsPerSlide = 4, onAddToCart, onProductClick }) => {
  const items = Array.isArray(products) ? products : Array.isArray(products?.items) ? products.items : [];
  const slides = chunkArray(items, productsPerSlide);
  console.log('CarouselCards items:', items);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-danger py-4">
        Error al cargar productos
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        No hay productos para mostrar
      </div>
    );
  }

  return (
    <Carousel indicators={slides.length > 1}>
      {slides.map((group, idx) => (
        <Carousel.Item key={idx}>
          <Row className="justify-content-center">
            {group.map(product => {
              const id = product?.id
              const name = product?.productName ?? 'Producto';
              const price = product?.price ?? product?.salePrice ?? 0;

              const img = product?.images?.length > 0
                ? `http://localhost:5053${product.images.find(img => img.isMain)?.url || product.images[0].url}`
                : DEFAULT_IMG;
              console.log("imagne", img)
              return (
                <Col key={id} md={12 / productsPerSlide} className="mb-4">
                  <Card className="product-card-custom h-100">
                    <div className="position-relative">
                      {/* Badge de descuento: renderiza solo si tiene discount */}
                      {product?.discount && (
                        <Badge bg="warning" className="discount-badge">{product.discount}% OFF</Badge>
                      )}
                      <Card.Img
                        variant="top"
                        src={img}
                        alt={name}
                        onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_IMG; }}
                        style={{ height: '180px', objectFit: 'contain', background: '#fff', padding: '16px' }}
                      />
                    </div>
                    <Card.Body className="d-flex flex-column">
                      {product?.oldPrice && (
                        <div className="text-muted text-decoration-line-through small mb-1">${product.oldPrice}</div>
                      )}
                      <Card.Text className="fw-bold fs-5 mb-1">${price}</Card.Text>
                      <Card.Title className="fs-6 mb-2">{name}</Card.Title>
                      <div className="mt-auto">
                        <Button
                          variant="outline-dark"
                          className="w-100"
                          onClick={() => typeof onAddToCart === 'function' ? onAddToCart(product) : null}
                        >
                          Agregar al carrito
                        </Button>
                        <Button
                          variant="link"
                          className="w-100 mt-2 text-decoration-none"
                          onClick={() => typeof onProductClick === 'function' ? onProductClick(product) : null}
                        >
                          Ver detalle
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

CarouselCards.propTypes = {
  products: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  loading: PropTypes.bool,
  error: PropTypes.any,
  productsPerSlide: PropTypes.number,
  onAddToCart: PropTypes.func,
  onProductClick: PropTypes.func,
};

export default CarouselCards