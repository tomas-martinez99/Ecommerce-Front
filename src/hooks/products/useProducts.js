import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import  productService  from "../../services/prodcutServices/product.service.js";

const serialize = (obj = {}) =>
  Object.keys(obj)
    .sort()
    .filter((k) => obj[k] !== undefined && obj[k] !== null && obj[k] !== "")
    .map((k) => `${k}=${obj[k]}`)
    .join("&");

export function useProducts(filters = {}, options = {}) {
  const paramsKey = serialize(filters);
  return useQuery({
    queryKey: ["products", paramsKey || "all"],
    queryFn: () => productService.getAll(filters),
    keepPreviousData: true,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    ...options,
  });
}


export function useProductsProvider(params) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productService.getAllWhitProvider(params),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });
}

export function useProductById(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getById(id),
    enabled: !!id,          // solo ejecuta si hay id válido
    staleTime: 1000 * 60,   // cachea 1 minuto
    retry: 1,               // reintenta una vez si falla
  });
}

export function useProductAdminById(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getAdminById(id),
    enabled: !!id,          // solo ejecuta si hay id válido
    staleTime: 1000 * 60,   // cachea 1 minuto
    retry: 1,               // reintenta una vez si falla
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => productService.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => productService.update(id, payload),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["products"] });
      if (vars?.id) qc.invalidateQueries({ queryKey: ["product", vars.id] });
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => productService.remove(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["products"] });
      const previous = qc.getQueryData(["products"]);
      qc.setQueryData(["products"], (old) => {
        if (!old) return old;
        if (Array.isArray(old)) return old.filter((p) => p.id !== id);
        if (old.items) return { ...old, items: old.items.filter((p) => p.id !== id), total: typeof old.total === "number" ? Math.max(0, old.total - 1) : old.total };
        return old;
      });
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) qc.setQueryData(["products"], context.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}