import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useProductGroup, useUpdateProductGroup } from '../../../../hooks/productGroups/useProductGroups';

const UpdateProductGroup = ({ show, onHide, productGroupId, refetch }) => {
    const { data: groupData, isLoading: isLoadingGroup, isError: isErrorGroup, error: groupError } = useProductGroup(productGroupId);
    const { mutate, isLoading: isUpdating } = useUpdateProductGroup();

    const [form, setForm] = useState({ name: "" });

    useEffect(() => {
        if (groupData) {
            const g = groupData?.id ? groupData : groupData?.item ?? groupData;
            setForm({ name: g?.name ?? "" });
        } else {
            setForm({ name: "" });
        }
    }, [groupData]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!productGroupId) return;
        mutate(
            { id: productGroupId, payload: form },
            {
                onSuccess: () => {
                    if (refetch) refetch();
                    onHide();
                },
                onError: (err) => alert(err?.message ?? "Error al actualizar grupo de producto"),
            }
        );
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar grupo de producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoadingGroup ? (
                    <div className="d-flex justify-content-center py-3"><Spinner animation="border" /></div>
                ) : isErrorGroup ? (
                    <div className="text-danger">Error: {groupError?.message ?? "No se pudo cargar el grupo de producto"}</div>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Nombre del grupo de producto"
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
};

export default UpdateProductGroup;

UpdateProductGroup.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    productGroupId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    refetch: PropTypes.func,
};
