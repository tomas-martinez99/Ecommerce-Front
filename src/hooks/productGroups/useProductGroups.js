import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productGroupService } from "../../services/productGroupServices/productGroup.Service";


// Obtener todos los grupos de productos
export function useProductGroups() {
  return useQuery({
    queryKey: ["productGroups"],
    queryFn: () => productGroupService.getAll(),
    staleTime: 1000 * 60,
  });
}

// Obtener un grupo de producto por ID
export function useProductGroup(id) {
  return useQuery({
    queryKey: ["productGroup", id],
    queryFn: () => productGroupService.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60,
  });
}

// Crear un grupo de producto
export function useCreateProductGroup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => productGroupService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["productGroups"] });
    },
  });
}

// Actualizar un grupo de producto
export function useUpdateProductGroup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => productGroupService.update(id, payload),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["productGroups"] });
      if (vars?.id) qc.invalidateQueries({ queryKey: ["productGroup", vars.id] });
    },
  });
}

export function useDeleteBrand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => productGroupService.remove(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["productGroups"] });
      const previous = qc.getQueryData(["productGroups"]);
      qc.setQueryData(["productGroups"], (old) => {
        if (!old) return old;
        if (Array.isArray(old)) return old.filter((p) => p.id !== id);
        if (old.items) return { ...old, items: old.items.filter((p) => p.id !== id), total: typeof old.total === "number" ? Math.max(0, old.total - 1) : old.total };
        return old;
      });
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) qc.setQueryData(["productGroups"], context.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["productGroups"] }),
  });
}
