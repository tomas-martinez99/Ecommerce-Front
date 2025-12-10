import { api } from "../../api/api.js"; // asumiendo src/api/api.js

// src/services/product.service.js
const BASE = "/Product";

const normalizePaged = (data, params = {}) => {
  if (Array.isArray(data)) {
    return {
      items: data,
      total: data.length,
      page: params.page ?? 1,
      pageSize: params.pageSize ?? data.length,
    };
  }

  if (data && typeof data === "object") {
    const items = Array.isArray(data.items) ? data.items : [];
    const total = typeof data.total === "number" ? data.total : items.length;
    const page = typeof data.page === "number" ? data.page : params.page ?? 1;
    const pageSize = typeof data.pageSize === "number" ? data.pageSize : params.pageSize ?? items.length;
    return { items, total, page, pageSize };
  }

  return { items: [], total: 0, page: params.page ?? 1, pageSize: params.pageSize ?? 0 };
};

const handleError = (err) => {
  const normalized = {
    message:
      err?.message ||
      err?.response?.data?.message ||
      "Error desconocido en product.service",
    status: err?.status || err?.response?.status || null,
    details: err?.details || err?.response?.data || null,
  };
  console.error("product.service error:", err); // log original completo
  console.error("product.service normalized:", normalized);
  throw normalized;
};

const getAll = async (params = {}) => {
  try {
    const { data, status } = await api.get(BASE, { params });
    if (status < 200 || status >= 300) throw { message: `HTTP ${status}`, status };
    return normalizePaged(data, params);
  } catch (err) {
    handleError(err);
  }
};

const getById = async (id) => {
  try {
    const { data, status } = await api.get(`${BASE}/${id}`);
    if (status < 200 || status >= 300) throw { message: `HTTP ${status}`, status };
    return data;
  } catch (err) {
    handleError(err);
  }
};

const getAdminById = async (id) => {
  try {
    const { data, status } = await api.get(`${BASE}/${id}/admin`);
    if (status < 200 || status >= 300) throw { message: `HTTP ${status}`, status };
    return data;
  } catch (err) {
    handleError(err);
  }
};

const create = async (payload) => {
  try {
    const { data, status } = await api.post(BASE, payload);
    if (status < 200 || status >= 300) throw { message: `HTTP ${status}`, status };
    return data;
  } catch (err) {
    handleError(err);
  }
};

const update = async (id, payload) => {
  try {
    const { data, status } = await api.put(`${BASE}/${id}`, payload);
    if (status < 200 || status >= 300) throw { message: `HTTP ${status}`, status };
    return data;
  } catch (err) {
    handleError(err);
  }
};

const remove = async (id) => {
  try {
    const { data, status } = await api.delete(`${BASE}/${id}`);
    if (status < 200 || status >= 300) throw { message: `HTTP ${status}`, status };
    return data;
  } catch (err) {
    handleError(err);
  }
};

// Ejemplo adicional: llamá endpoint que devuelve productos con provider
const getAllWhitProvider = async (params = {}) => {
  try {
    const { data, status } = await api.get(`${BASE}/admin`, { params });
    if (status < 200 || status >= 300) throw { message: `HTTP ${status}`, status };
    return normalizePaged(data, params);
  } catch (err) {
    handleError(err);
  }
};


export default {
  getAll,
  getById,
  create,
  update,
  remove,
  getAllWhitProvider,
  getAdminById
};
