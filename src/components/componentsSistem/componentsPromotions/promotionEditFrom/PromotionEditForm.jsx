// PromotionEditForm.jsx
import { Form } from "react-bootstrap";
import { PROMOTION_TYPE_MAP } from "../../../../services/helper/promotionConstans";
import ProductTable from "../productTable/ProducTable";
import ProductSelector from "../productSelector/ProductSelector";

export default function PromotionEditForm({ promotion, setPromotion }) {
  const handleChange = (field, value) => {
    setPromotion({ ...promotion, [field]: value });
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          value={promotion.promotionName}
          onChange={(e) => handleChange("promotionName", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tipo</Form.Label>
        <Form.Select
          value={promotion.type}
          onChange={(e) => handleChange("type", Number(e.target.value))}
        >
          {Object.entries(PROMOTION_TYPE_MAP).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Valor</Form.Label>
        <Form.Control
          type="number"
          value={promotion.value}
          onChange={(e) => handleChange("value", Number(e.target.value))}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Extra</Form.Label>
        <Form.Control
          type="number"
          value={promotion.extra}
          onChange={(e) => handleChange("extra", Number(e.target.value))}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="switch"
          id="isEnabled"
          label="Activa"
          checked={promotion.isEnabled}
          onChange={(e) => handleChange("isEnabled", e.target.checked)}
        />
      </Form.Group>

      <h5 className="mt-4">Productos asociados</h5>
      <ProductTable promotion={promotion} setPromotion={setPromotion} />
      <ProductSelector promotion={promotion} setPromotion={setPromotion} />
    </>
  );
}