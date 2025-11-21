import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useBrand, useUpdateBrand } from '../../../../hooks/brands/useBrands';

const UpdateBrand = ({ show, onHide, brandId, refetch }) => {
    const { data: brandData, isLoading: isLoadingBrand, isError: isErrorBrand, error: brandError } = useBrand(brandId);
    const { mutate, isLoading: isUpdating } = useUpdateBrand();

    const [form, setForm] = useState({ brandName: "" });

    useEffect(() => {
        if (brandData) {
            // brandData puede venir envuelto (items) o ser objeto; normalizar
            const b = brandData?.id ? brandData : brandData?.item ?? brandData;
            setForm({ brandName: b?.brandName ?? "" });
        } else {
            setForm({ brandName: "" });
        }
    }, [brandData]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!brandId) return;
        mutate(
            { id: brandId, payload: form },
            {
                onSuccess: () => {
                    if (refetch) refetch();
                    onHide();
                },
                onError: (err) => {
                    alert(err?.message ?? "Error al actualizar marca");
                },
            }
        );
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar marca</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {isLoadingBrand ? (
                    <div className="d-flex justify-content-center py-3"><Spinner animation="border" /></div>
                ) : isErrorBrand ? (
                    <div className="text-danger">Error: {brandError?.message ?? "No se pudo cargar la marca"}</div>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                name="brandName"
                                value={form.brandName}
                                onChange={handleChange}
                                placeholder="Nombre de la marca"
                                required
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={onHide} disabled={isUpdating}>Cancelar</Button>
                            <Button variant="primary" type="submit" disabled={isUpdating}>
                                {isUpdating ? "Guardando..." : "Guardar cambios"}
                            </Button>
                        </div>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default UpdateBrand;

UpdateBrand.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    brandId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    refetch: PropTypes.func,
};
