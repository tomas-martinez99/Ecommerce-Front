import { api } from "../../api/api.js";

const BASE = "/Brand";

export const brandService = {

    getAll: async () => {
        try {
            const { data, status } = await api.get(BASE);
            if (status < 200 || status >= 300) {
                throw { message: `HTTP ${status}`, status };
            }

            // Si la API devuelve directamente un array
            if (Array.isArray(data)) {
                return data;
            }

            // Si devuelve un objeto con items
            if (data && typeof data === "object" && Array.isArray(data.items)) {
                return data.items;
            }

            return [];
        } catch (err) {
            const normalized = {
                message: err?.message ?? err?.response?.data?.message ?? "Error desconocido al obtener marcas",
                status: err?.status ?? err?.response?.status ?? null,
                details: err?.response?.data ?? null,
            };
            console.error("brandService.getAll error:", normalized);
            throw normalized;
        }
    },

    getById: async (id) => {
        try {
            const { data } = await api.get(`${BASE}/${id}`);
            return data;
        } catch (err) {
            const normalized = {
                message: err?.message ?? err?.response?.data?.message ?? "Error al obtener marca",
                status: err?.status ?? err?.response?.status ?? null,
                details: err?.response?.data ?? null,
            };
            throw normalized;
        }
    },

    create: async (payload) => {
        try {
            const { data, status } = await api.post(BASE, payload);
            if (status < 200 || status >= 300) {
                throw { message: `HTTP ${status}`, status };
            }
            return data;
        } catch (err) {
            const normalized = {
                message: err?.message ?? err?.response?.data?.message ?? "Error al crear marca",
                status: err?.status ?? err?.response?.status ?? null,
                details: err?.response?.data ?? null,
            };
            throw normalized;
        }
    },

    update: async (id, payload) => {
        try {
            const { data, status } = await api.put(`${BASE}/${id}`, payload);
            if (status < 200 || status >= 300) throw { message: `HTTP ${status}`, status };
            return data;
        } catch (err) {
            const normalized = {
                message: err?.message ?? err?.response?.data?.message ?? "Error al actualizar marca",
                status: err?.status ?? err?.response?.status ?? null,
                details: err?.response?.data ?? null,
            };
            console.error("brandService.update error:", normalized);
            throw normalized;
        }
    },

     remove: async (id) => {
      try {
        const { data, status } = await api.delete(`${BASE}/${id}`);
        if (status < 200 || status >= 300) throw { message: `HTTP ${status}`, status };
        return data;
      } catch (err) {
            const normalized = {
                message: err?.message ?? err?.response?.data?.message ?? "Error al borrar marca",
                status: err?.status ?? err?.response?.status ?? null,
                details: err?.response?.data ?? null,
            };
            console.error("brandService.remove error:", normalized);
            throw normalized;
        }
       
      }
    
    }

