import { api } from "../../api/api.js"; // mismo api centralizado

const BASE = "/promotion";

const handleError = (err) => {
  const normalized = {
    message:
      err?.message ||
      err?.response?.data?.message ||
      "Error desconocido en promotion.service",
    status: err?.status || err?.response?.status || null,
    details: err?.details || err?.response?.data || null,
  };
  console.error("promotion.service error:", err);
  console.error("promotion.service normalized:", normalized);
  throw normalized;
};

// Crear promoción
const create = async (payload) => {
  try {
    const { data, status } = await api.post(BASE, payload);
    if (status < 200 || status >= 300) throw { message: `HTTP ${status}`, status };
    return data;
  } catch (err) {
    handleError(err);
  }
};

// Obtener promoción por ID (detalle con productos)
const getById = async (id) => {
  try {
    const { data, status } = await api.get(`${BASE}/${id}`);
    if (status < 200 || status >= 300) throw { message: `HTTP ${status}`, status };
    return data;
  } catch (err) {
    handleError(err);
  }
};

// Listar todas las promociones (con filtros/paginación)
const getAll = async (params = {}) => {
  try {
    const { data, status } = await api.get(`${BASE}/all`, { params });
    if (status < 200 || status >= 300) throw { message: `HTTP ${status}`, status };
    return data;
  } catch (err) {
    handleError(err);
  }
};

// Eliminar promoción
const remove = async (id) => {
  try {
    const { data, status } = await api.delete(`${BASE}/${id}`);
    if (status < 200 || status >= 300) throw { message: `HTTP ${status}`, status };
    return data;
  } catch (err) {
    handleError(err);
  }
};


// Actualizar promoción
const update = async (id, payload) => {
  try {
    const { data, status } = await api.put(`${BASE}/${id}`, payload);
    if (status < 200 || status >= 300) throw { message: `HTTP ${status}`, status };
    return data;
  } catch (err) {
    handleError(err);
  }
};

// Obtener solo promociones activas
const getActive = async () => {
  try {
    const { data, status } = await api.get(`${BASE}/active`);
    if (status < 200 || status >= 300) throw { message: `HTTP ${status}`, status };
    return data;
  } catch (err) {
    handleError(err);
  }
};

// Activar promoción
const enable = async (id) => {
  try {
    const { status } = await api.put(`${BASE}/${id}/enable`);
    if (status < 200 || status >= 300) throw { message: `HTTP ${status}`, status };
    return true;
  } catch (err) {
    handleError(err);
  }
};

// Desactivar promoción
const disable = async (id) => {
  try {
    const { status } = await api.put(`${BASE}/${id}/disable`);
    if (status < 200 || status >= 300) throw { message: `HTTP ${status}`, status };
    return true;
  } catch (err) {
    handleError(err);
  }
};

export default {
  create,
  getById,
  getAll,
  remove,
  update,
  getActive,
  enable,
  disable
};