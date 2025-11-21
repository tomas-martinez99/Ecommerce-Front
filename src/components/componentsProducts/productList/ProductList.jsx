import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, Row, Col, Badge, Button, Nav, Spinner, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './ProductList.css';
import { useProducts } from '../../../hooks/products/useProducts';
import { useProductGroups } from '../../../hooks/productGroups/useProductGroups';

const DEFAULT_IMG = '/public/productImg/ImgDefault.jpg'; // ✅ sin /public

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const {data: productGroup = []} = useProductGroups();
  const brandId = searchParams.get('brandId');
  const productGroupId = searchParams.get('productGroupId');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    setPage(1);
  }, [brandId, productGroupId]);

  const { data: productsData, isLoading, isError, error, isFetching } = useProducts({
    brandId: brandId ? Number(brandId) : undefined,
    productGroupId: productGroupId ? Number(productGroupId) : undefined,
    page,
    pageSize,
  });

  if (isLoading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (isError) return <Alert variant="danger" className="mt-5 text-center">{error?.message ?? "Error"}</Alert>;

  const paged = productsData ?? { items: [], total: 0, page, pageSize };
  const items = Array.isArray(paged.items) ? paged.items : [];
  const total = typeof paged.total === 'number' ? paged.total : items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));


  return (
    <div className="product-layout" style={{ paddingTop: 130 }}>
      <aside className="menu-lateral">
          {productGroup.map(cat => (
            <Button
              key={cat.id}
              className='btn2 mx-2'
              href={`/productList?productGroupId=${cat.id}`}
              >
                {cat.name}
              </Button>
          ))}         
      </aside>
      <main className="product-content">
        <div className="product-grid">
          {items.map((product) => {
              const id = product?.id
              const name = product?.productName ?? 'Producto';
              const price = product?.price ?? product?.salePrice ?? 0;
              const img = product?.images?.length > 0
                ? `http://localhost:5053${product.images.find(img => img.isMain)?.url || product.images[0].url}`
                : DEFAULT_IMG;
              console.log("imagne", img)
            return (
             <div key={id} className="product-list-col">
                <div className="product-card">                 
                    {product.discount && (
                      <Badge bg="warning" className="discount-badge">
                        {product.discount}% OFF
                      </Badge>
                    )}
                    <Card.Img
                      variant="top"
                      src={img}
                      alt={name}
                      onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_IMG; }}
                      style={{ height: '180px', objectFit: 'contain', background: '#fff', padding: '16px' }}
                    />
                  <Card.Body >
                    <div>
                    {product.oldPrice && (
                      <div className="text-muted text-decoration-line-through small mb-1">
                        {product.oldPrice}
                      </div>
                    )}
                    <Card.Text className="fw-bold fs-5 mb-1">{price}</Card.Text>
                    <Card.Title className="fs-6 mb-2">{name}</Card.Title>
                    {product.freeShipping && (
                      <Badge bg="success" className="mb-2">Envío gratis</Badge>
                    )}
                    </div>
                    <Button variant="outline-dark" className="w-100 mt-2">Agregar al carrito</Button>
                  </Card.Body>
                </div>
              </div>
            );
          })}
        </div>
          {items.length === 0 && (
            <Col>
              <p className="text-center mt-4">No se encontraron productos.</p>
            </Col>
          )}
        <div className="d-flex justify-content-center align-items-center gap-3 my-4">
        <div className="pagination-wrapper d-flex justify-content-center align-items-center gap-3">
          <Button onClick={() => setPage((s) => Math.max(1, s - 1))} disabled={page === 1}>
            Anterior
          </Button>

          <span>
            Página {page} / {totalPages} {isFetching && <small> (actualizando...)</small>}
          </span>

          <Button onClick={() => setPage((s) => Math.min(totalPages, s + 1))} disabled={page === totalPages}>
            Siguiente
          </Button>
        </div>
        </div>
      </main>
    </div>
  );
};

export default ProductList;
