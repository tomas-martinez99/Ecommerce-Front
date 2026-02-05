// ProductSelector.jsx
import { useEffect, useMemo, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useProductsProvider } from "../../../../hooks/products/useProducts";

export default function ProductSelector({ promotion, setPromotion, maxVisible = 10 }) {
  const { data: rawProducts, isLoading, isError } = useProductsProvider();
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState(search);
  const [showCount, setShowCount] = useState(maxVisible);
   
  // Convertir la respuesta en un array seguro
  const allProducts = useMemo(() => {
    if (!rawProducts) return [];
    if (Array.isArray(rawProducts)) return rawProducts;
    if (Array.isArray(rawProducts.items)) return rawProducts.items;
    if (Array.isArray(rawProducts.data)) return rawProducts.data;
     
    return [];
  }, [rawProducts]);

  // Debounce para el buscador
  useEffect(() => {
    const id = setTimeout(() => setDebounced(search), 250);
    return () => clearTimeout(id);
  }, [search]);

  // IDs ya asociados para evitar duplicados
  const selectedIds = useMemo(
    () => new Set((promotion.products || []).map(p => p.id)),
    [promotion.products]
  );

  // Filtrado seguro
  const filtered = useMemo(() => {
    const list = Array.isArray(allProducts) ? allProducts : [];
    const q = debounced.trim().toLowerCase();
    const base = q
      ? list.filter(p => (p.productName || "").toLowerCase().includes(q))
      : list;
    console.log(allProducts,"Agregador de productos")
    return base.filter(p => !selectedIds.has(p.id));
  }, [allProducts, debounced, selectedIds]);

  const handleAdd = (product) => {
    setPromotion({
      ...promotion,
      products: [...(promotion.products || []), product]
    });
  };

  return (
    <div className="mt-3">
      <Form.Label>Buscar producto</Form.Label>
      <Form.Control
        type="text"
        placeholder="Escribe para buscar..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowCount(maxVisible); // reset paginado al cambiar query
        }}
      />

      <div className="mt-2">
        {isLoading && (
          <div className="d-flex align-items-center gap-2">
            <Spinner animation="border" size="sm" />
            <span>Cargando productos...</span>
          </div>
        )}

        {isError && <div className="text-danger">Error al cargar productos.</div>}

        {!isLoading && filtered.length === 0 && (
          <div className="text-muted">
            {debounced
              ? "No hay resultados para tu búsqueda."
              : "No hay productos disponibles o ya están todos asociados."}
          </div>
        )}

        {!isLoading && filtered.slice(0, showCount).map(prod => (
          <div
            key={prod.id}
            className="d-flex justify-content-between align-items-center py-1 border-bottom"
          >
            <div className="d-flex flex-column">
              <strong>{prod.productName}</strong>
              <small className="text-muted">
                ID: {prod.id} • Stock: {prod.stock} • ${prod.cost} • {prod.brand?.brandName ?? "Sin marca"}
              </small>
            </div>
            <Button size="sm" onClick={() => handleAdd(prod)}>Agregar</Button>
          </div>
        ))}

        {!isLoading && filtered.length > showCount && (
          <div className="mt-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => setShowCount(c => c + maxVisible)}
            >
              Ver más
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
