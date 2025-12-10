import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useProvider, useUpdateProvider } from '../../../../hooks/providers/useProviders';

const UpdateProvider = ({ show, onHide, providerId, refetch }) => {
    const { data: providerData, isLoading: isLoadingProvider, isError: isErrorProvider, error: providerError } = useProvider(providerId);
    const { mutate, isLoading: isUpdating } = useUpdateProvider();

    const [form, setForm] = useState({ providerName: "" });

    useEffect(() => {
        if (providerData) {
            // providerData puede venir envuelto (items) o ser objeto; normalizar
            const p = providerData?.id ? providerData : providerData?.item ?? providerData;
            setForm({ providerName: p?.providerName ?? "" });
        } else {
            setForm({ providerName: "" });
        }
    }, [providerData]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!providerId) return;
        mutate(
            { id: providerId, payload: form },
            {
                onSuccess: () => {
                    if (refetch) refetch();
                    onHide();
                },
                onError: (err) => {
                    alert(err?.message ?? "Error al actualizar proveedor");
                },
            }
        );
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar proveedor</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {isLoadingProvider ? (
                    <div className="d-flex justify-content-center py-3"><Spinner animation="border" /></div>
                ) : isErrorProvider ? (
                    <div className="text-danger">Error: {providerError?.message ?? "No se pudo cargar el proveedor"}</div>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                name="providerName"
                                value={form.providerName}
                                onChange={handleChange}
                                placeholder="Nombre del proveedor"
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

export default UpdateProvider;

UpdateProvider.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    providerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    refetch: PropTypes.func,
};