import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { brandService } from "../../services/brandServices/brand.service";

// Obtener todas las marcas
export function useBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => brandService.getAll(),
    staleTime: 1000 * 60, // 1 minuto
  });
}

// Obtener una marca por ID
export function useBrand(id) {
  return useQuery({
    queryKey: ["brand", id],
    queryFn: () => brandService.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60,
  });
}

// Crear una nueva marca
export function useCreateBrand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => brandService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["brands"] });
    },
  });
}

// Actualizar una marca existente
export function useUpdateBrand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => brandService.update(id, payload),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["brands"] });
      if (vars?.id) {
        qc.invalidateQueries({ queryKey: ["brand", vars.id] });
      }
    },
  });
}

export function useDeleteBrand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => brandService.remove(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["brands"] });
      const previous = qc.getQueryData(["brands"]);
      qc.setQueryData(["brands"], (old) => {
        if (!old) return old;
        if (Array.isArray(old)) return old.filter((p) => p.id !== id);
        if (old.items) return { ...old, items: old.items.filter((p) => p.id !== id), total: typeof old.total === "number" ? Math.max(0, old.total - 1) : old.total };
        return old;
      });
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) qc.setQueryData(["brands"], context.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["brands"] }),
  });
}
