import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useCreateProductGroup } from '../../../../hooks/productGroups/useProductGroups';

const AddProductGroup = ({ show, onHide, refetch }) => {
    const [form, setForm] = useState({ name: '' });
    const { mutate, isLoading } = useCreateProductGroup();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(form, {
            onSuccess: () => {
                if (refetch) refetch();
                onHide();
            },
            onError: (error) => alert(error.message),
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Crear grupo de producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            name="name"
                            placeholder="Nombre del grupo de producto"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        Crear Grupo
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddProductGroup;

AddProductGroup.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    refetch: PropTypes.func,
};
