import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const ConfirmDelete = ({ show, onCancel, onConfirm, itemName, loading }) => {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {itemName
          ? `¿Estás seguro de eliminar el producto "${itemName}"? Esta acción no se puede deshacer.`
          : '¿Estás seguro de eliminar este elemento? Esta acción no se puede deshacer.'}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmDelete.propTypes = {
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  itemName: PropTypes.string,
  loading: PropTypes.bool,
};

export default ConfirmDelete;