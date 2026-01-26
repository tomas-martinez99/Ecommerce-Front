// PromotionDetailModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { usePromotionDetail } from "../../../../hooks/promotions/usePromotions";
import PromotionDetailView from "../promotionDetailView/PromotionDetailView";
import PromotionEditForm from "../promotionEditFrom/PromotionEditForm";

export default function PromotionDetailModal({ show, onHide, promotionId, onEdit }) {
  const { data: promotion } = usePromotionDetail(promotionId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPromotion, setEditedPromotion] = useState(null);

  useEffect(() => {
    if (promotion) setEditedPromotion({ ...promotion });
  }, [promotion]);

  if (!promotion) return null;

  const handleSave = () => {
  // Transformar productos a IDs si tu backend lo requiere
  const payload = {
    ...editedPromotion,
    productIds: (editedPromotion.products || []).map(p => p.id),
  };

  onEdit(payload); // se dispara hacia el padre
  setIsEditing(false);
};


  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? `Editar Promoción #${promotion.id}` : `Detalle de Promoción #${promotion.id}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isEditing ? (
          <PromotionDetailView promotion={promotion} />
        ) : (
          <PromotionEditForm promotion={editedPromotion} setPromotion={setEditedPromotion} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
        {!isEditing ? (
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            <FaEdit /> Editar
          </Button>
        ) : (
          <>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancelar</Button>
            <Button variant="success" onClick={handleSave}>Guardar</Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}
