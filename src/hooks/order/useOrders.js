import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import  orderService  from "../../services/orederServices/order.service";

// Obtener todas las órdenes
export function useOrders(params) {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => orderService.getAll(params),
    staleTime: 1000 * 60,
  });
}

// Obtener una orden por ID
export function useOrder(id) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => orderService.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60,
  });
}

// Crear una nueva orden
export function useCreateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => orderService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

// Actualizar una orden existente
export function useUpdateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => orderService.update(id, payload),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["orders"] });
      if (vars?.id) {
        qc.invalidateQueries({ queryKey: ["order", vars.id] });
      }
    },
  });
}

// Eliminar una orden
export function useDeleteOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => orderService.remove(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["orders"] });
      const previous = qc.getQueryData(["orders"]);
      qc.setQueryData(["orders"], (old) => {
        if (!old) return old;
        if (Array.isArray(old)) return old.filter((o) => o.id !== id);
        if (old.items) return { ...old, items: old.items.filter((o) => o.id !== id) };
        return old;
      });
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) qc.setQueryData(["orders"], context.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

export function useUpdateOrderStatus() {
  return useMutation({
    mutationFn: ({ id, payload }) => orderService.changeStatus(id, payload),
  });
}
