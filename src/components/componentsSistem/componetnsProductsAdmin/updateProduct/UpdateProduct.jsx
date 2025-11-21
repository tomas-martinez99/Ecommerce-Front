import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useProviders } from '../../../../hooks/providers/useProviders';
import { useBrands } from '../../../../hooks/brands/useBrands';
import { useProductGroups } from '../../../../hooks/productGroups/useProductGroups';
import { useProductAdminById } from '../../../../hooks/products/useProducts';
import { normalizeProduct } from '../../../../services/helper/normalizeProduct';

const UpdateProduct = ({ show, onHide, product, refetch, onUpdate }) => {
  const { data: providers } = useProviders();
  const { data: brands } = useBrands();
  const { data: productGroups } = useProductGroups();

  const { data: productData, isLoading } = useProductAdminById(product?.id, show);

  const [form, setForm] = useState({
    sku: '',
    productName: '',
    description: '',
    price: 0,
    cost: 0,
    stock: 0,
    providerId: '',
    brandId: '',
    productGroupId: ''
  });

  useEffect(() => {
    if (productData) {
      setForm({
        sku: productData.sku || '',
        productName: productData.productName || '',
        description: productData.description || '',
        price: productData.price || 0,
        cost: productData.cost || 0,
        stock: productData.stock || 0,
        providerId: productData.providerId || '',
        brandId: productData.brandId || '',
        productGroupId: productData.productGroupId || ''
      });
      console.log('Loaded product data for editing:', productData.providerId, productData.sku);
    }

  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: ["providerId", "brandId", "productGroupId"].includes(name)
        ? parseInt(value) || ""
        : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = normalizeProduct(form);
    console.log('Payload to update:', payload.providerId, payload.sku);
    if (onUpdate && product?.id) {
      onUpdate(product.id, payload, {
        onSuccess: () => {
          if (refetch) refetch();
          onHide();
        },
        onError: (error) => {
          alert(error.message);
        }
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div className="text-center py-5">Cargando datos...</div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                name="sku"
                placeholder="Código del producto"
                value={form.sku}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                name="productName"
                placeholder="Nombre del producto"
                value={form.productName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                name="description"
                placeholder="Descripción"
                value={form.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                name="price"
                placeholder="Precio"
                type="number"
                value={form.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                name="cost"
                placeholder="Costo"
                type="number"
                value={form.cost}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                name="stock"
                placeholder="Stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                name="providerId"
                value={form.providerId}
                onChange={handleChange}
              >
                <option value="">Proveedor</option>
                {(Array.isArray(providers?.items) ? providers.items : Array.isArray(providers) ? providers : []).map(prov => (
                  <option key={prov.id} value={prov.id}>
                    {prov.providerName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                name="brandId"
                value={form.brandId}
                onChange={handleChange}
              >
                <option value="">Marcas</option>
                {(Array.isArray(brands?.items) ? brands.items : Array.isArray(brands) ? brands : []).map(bra => (
                  <option key={bra.id} value={bra.id}>
                    {bra.brandName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                name="productGroupId"
                value={form.productGroupId}
                onChange={handleChange}
              >
                <option value="">Categorías</option>
                {(Array.isArray(productGroups?.items) ? productGroups.items : Array.isArray(productGroups) ? productGroups : []).map(pg => (
                  <option key={pg.id} value={pg.id}>
                    {pg.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button variant="secondary" onClick={onHide}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar Cambios
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

UpdateProduct.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  product: PropTypes.object,
  refetch: PropTypes.func,
  onUpdate: PropTypes.func
};

export default UpdateProduct;
