import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useSettings, useUpdateSettings } from "../../../../hooks/settings/useSettings";

export default function Settings() {
  const { data, isLoading, error } = useSettings();
  const updateSettings = useUpdateSettings();

  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (data) {
      setPhone(data.phone); // 👈 asumiendo que el backend devuelve { phone: "..." }
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings.mutate({ phone });
  };

  if (isLoading) return <p>Cargando settings...</p>;
  if (error) return <p>Error al cargar settings</p>;

  return (
    <Card className="p-3">
      <h4>Configuración</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Número de Teléfono: +{data.whatsAppNumber}</Form.Label>
          <Form.Control
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ingresa tu número"
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={updateSettings.isLoading}>
          {updateSettings.isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </Form>
    </Card>
  );
}