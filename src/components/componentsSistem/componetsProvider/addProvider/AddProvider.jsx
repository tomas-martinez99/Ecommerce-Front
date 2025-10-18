import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useCreateProvider } from '../../../../hooks/providers/useProviders';

const AddProvider = ({ show, onHide, refetch }) => {
    const [form, setForm] = useState({
        providerName: ''
    });

    const { mutate, isLoading } = useCreateProvider();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", form);
        mutate(form, {
            onSuccess: () => {
                if (refetch) refetch();
                onHide();
            },
            onError: (error) => {
                alert(error.message);
            }
        });
    }

    return (
        <div>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Crear proveedor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name='providerName'
                                placeholder="Nombre del proveedor"
                                value={form.providerName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type='submit' disabled={isLoading}>
                            Crear Proveedor
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
};

export default AddProvider;

AddProvider.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    refetch: PropTypes.func // Puede ser array de objetos o vacío
};