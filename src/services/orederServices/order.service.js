import { api } from "../../api/api.js"; // mismo api centralizado

const BASE = "/orders";

const handleError = (err) => {
  const normalized = {
    message:
      err?.message ||
      err?.response?.data?.message ||
      "Error desconocido en order.service",
    status: err?.status || err?.response?.status || null,
    details: err?.details || err?.response?.data || null,
  };
  console.error("order.service error:", err);
  console.error("order.service normalized:", normalized);
  throw normalized;
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

const getById = async (id) => {
  try {
    const { data, status } = await api.get(`${BASE}/${id}`);
    if (status < 200 || status >= 300) throw { message: `HTTP ${status}`, status };
    return data;
  } catch (err) {
    handleError(err);
  }
};

const getAll = async (params = {}) => {
  try {
    const { data, status } = await api.get(BASE, { params });
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

export default {
  create,
  getById,
  getAll,
  remove
};