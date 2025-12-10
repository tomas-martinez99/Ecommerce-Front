import React, { useState } from 'react';
import { Modal, Button, Carousel, Form, Spinner, Badge } from 'react-bootstrap';
import { useProductImages } from '../../../../hooks/productImages/useProductImages';
import { useProductById } from '../../../../hooks/products/useProducts';

export default function ImgModal({ show, onHide, productId }) {
  const [file, setFile] = useState(null);

  const { data: product, isLoading } = useProductById(productId);

  const {
    uploadImage,
    deleteImage,
    setMainImage,
    isUploading,
    isDeleting,
    isSettingMain,
    refetchImages,
  } = useProductImages(productId);

  if (!show) return null;
  if (isLoading) return <div className="p-4 text-center">Cargando...</div>;
  if (!product ) return<div className="p-4 text-center">No se encontró el producto</div>;

  const handleFileChange = (e) => {
    if (e.target.files?.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    await uploadImage({ file, isMain: false });
    setFile(null);
    refetchImages();
  };

  const handleDelete = async (imageId) => {
    await deleteImage(imageId);
    refetchImages();
  };

  const handleSetMain = async (imageId) => {
    await setMainImage(imageId);
    refetchImages();
  };

  const images = product?.images ?? [];
  console.log("Product images:", images);
  console.log("Product data in ImgModal:", product);
  console.log("Product ID in ImgModal:", productId);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Imágenes de {product?.productName ?? "Producto"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {images.length > 0 ? (
          images.length > 1 ? (
            <Carousel>
              {images.map((img, idx) => (
                <Carousel.Item key={idx}>
                  <div className="position-relative text-center">
                    <img
                      src={`http://localhost:5053${img.url}`}
                      alt={product?.productName ?? "Producto"}
                      className="d-block mx-auto"
                      style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                    {img.isMain && (
                      <Badge bg="success" className="position-absolute top-0 start-0 m-2">
                        Principal
                      </Badge>
                    )}
                  </div>
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    {!img.isMain && (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        disabled={isSettingMain}
                        onClick={() => handleSetMain(img.id)}
                      >
                        {isSettingMain ? <Spinner size="sm" animation="border" /> : "Marcar como principal"}
                      </Button>
                    )}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      disabled={isDeleting}
                      onClick={() => handleDelete(img.id)}
                    >
                      {isDeleting ? <Spinner size="sm" animation="border" /> : "Eliminar"}
                    </Button>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <img
              src={`http://localhost:5053${images[0].url}`}
              alt={product?.productName ?? "Producto"}
              className="d-block w-100"
              style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
          )
        ) : (
          <div className="text-center p-4 text-muted">
            No hay imágenes cargadas
          </div>
        )}

        {/* Input para nueva imagen */}
        <Form.Group className="mt-3">
          <Form.Label>Agregar nueva imagen</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button
          variant="primary"
          onClick={handleUpload}
          disabled={!file || isUploading}
        >
          {isUploading ? <Spinner size="sm" animation="border" /> : "Subir Imagen"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
