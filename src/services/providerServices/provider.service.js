
import { api } from "../../api/api.js";

const BASE = "/Provider";
export const providerService = {
    getAll: async (params) => {
        try {
            const { data, status } = await api.get(BASE, { params });
            if (status < 200 || status >= 300) {
                throw { message: `HTTP ${status}`, status };
            }
            if (Array.isArray(data)) {
                return { items: data, total: data.length, page: params?.page ?? 1, pageSize: params?.pageSize ?? data.length };
            }
            if (data && typeof data === "object") {
                const items = Array.isArray(data.items) ? data.items : [];
                const total = typeof data.total === "number" ? data.total : items.length;
                const page = typeof data.page === "number" ? data.page : params?.page ?? 1;
                const pageSize = typeof data.pageSize === "number" ? data.pageSize : params?.pageSize ?? items.length;
                return { items, total, page, pageSize };
            }
            return { items: [], total: 0, page: params?.page ?? 1, pageSize: params?.pageSize ?? 0 };
        } catch (err) {
            const normalized = {
                message: err?.message ?? err?.response?.data?.message ?? "Error desconocido al obtener productos",
                status: err?.status ?? err?.response?.status ?? null,
                details: err?.response?.data ?? null,
            };
            console.error("productService.getAll error:", normalized);
            throw normalized;
        }
    }};