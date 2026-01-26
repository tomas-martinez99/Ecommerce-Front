import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "../../../../assets/style/theme.css"
import PromotionTable from "../promotionTable/PromotionTable";
//import AddPromotion from "../addPromotion/AddPromotion";
import ConfirmDelete from "../../confirmDelete/ConfirmDelete";
import DetailPromotion from "../promotionDetailModal/PromotionDetailModal";
import { useDebounce } from "../../../../hooks/common/useDebounge";
import { usePromotions, useDeletePromotion, useUpdatePromotion, useEnablePromotion, useDisablePromotion } from "../../../../hooks/promotions/usePromotions"
import PromotionDetailModal from "../promotionDetailModal/PromotionDetailModal";
import PromotionCreateModal from "../promotionCreateModal/PromotionCreateModal";

export default function PromotionList() {
  const [q, setQ] = useState("");
  const [debouncedQ] = useDebounce(q, 400);
  const [modal, setModal] = useState({ type: null, payload: null });

  const { data: promotions = [], isLoading, isError, error, refetch } = usePromotions({ q: debouncedQ, page: 1, pageSize: 50 });
  const { mutateAsync: enablePromotion } = useEnablePromotion();
  const { mutateAsync: disablePromotion } = useDisablePromotion();
  const { mutateAsync: deletePromotion, isLoading: isDeleting } = useDeletePromotion();
  const updatePromotion = useUpdatePromotion();

  const handleEdit = async (promotion) => {
    try {
      await updatePromotion.mutateAsync({ id: promotion.id, payload: promotion });
      refetch(); // refresca la lista
      setModal({ type: null });
    }
    catch (err) {
      alert(err?.message || "Error al actualizar");
    }
  }
  const handleDelete = async (promotion) => {
    try {
      await deletePromotion(promotion.id);
      refetch();
      setModal({ type: null, payload: null });
    } catch (err) {
      alert(err?.message || "Error al eliminar");
    }
  };
  const handleToggle = async (promotion) => {
  try {
    if (promotion.isEnabled) {
      await disablePromotion(promotion.id);
    } else {
      await enablePromotion(promotion.id);
    }
    refetch();
  } catch (err) {
    alert(err?.message || "Error al cambiar estado");
  }
};

  return (
    <div className="page-center">
      <div className="component-card promotion">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Listado de Promociones</h2>
          <Button variant="primary" onClick={() => setModal({ type: "add" })}>
            + Agregar Promoción
          </Button>
        </div>

        <div className="mb-3 d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Buscar Promoción"
            style={{ maxWidth: 200 }}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Button variant="outline-secondary" onClick={refetch}>
            <FaSearch />
          </Button>
        </div>

        {isLoading ? (
          <Spinner animation="border" />
        ) : isError ? (
          <div className="text-danger">Error: {error?.message}</div>
        ) : (
          <PromotionTable
            promotions={promotions}
            onEdit={(id) => setModal({ type: "edit", payload: id })}
            onDelete={(promotion) => setModal({ type: "delete", payload: promotion })}
            onViewDetail={(id) => setModal({ type: "detail", payload: id })}
            onToggle={handleToggle}
          />
        )}

        {modal.type === "edit" && (
          <UpdatePromotion show onHide={() => setModal({ type: null })} promotionId={modal.payload} refetch={refetch} />
        )}
        {modal.type === "add" && (
          <PromotionCreateModal show onHide={() => setModal({ type: null })} refetch={refetch} />
        )}
        {modal.type === "delete" && (
          <ConfirmDelete
            show
            onCancel={() => setModal({ type: null })}
            onConfirm={() => handleDelete(modal.payload)}
            itemName={modal.payload?.promotionName}
            loading={isDeleting}
          />
        )}
        {modal.type === "detail" && (
          <PromotionDetailModal
            show
            onHide={() => setModal({ type: null })}
            promotionId={modal.payload}
            onEdit={handleEdit}   // 👈 ahora sí
          />
        )}
      </div>
    </div>
  );
}
