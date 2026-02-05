import { useQuery, useMutation } from "@tanstack/react-query";
import promotionService from "../../services/promotionsServices/promotions.service";

export function usePromotions(params = {}) {
  return useQuery({
    queryKey: ["promotions", params],
    queryFn: () => promotionService.getAll(params),
  });
}

export function usePromotionDetail(id) {
  return useQuery({
    queryKey: ["promotion", id],
    queryFn: () => promotionService.getById(id),
    enabled: !!id, // solo ejecuta si hay id
  });
}

export function useCreatePromotion() {
  return useMutation({
    mutationFn: (payload) => promotionService.create(payload),
  });
}

export function useUpdatePromotion() {
  return useMutation({
    mutationFn: ({ id, payload }) => promotionService.update(id, payload),
  });
}

export function useDeletePromotion() {
  return useMutation({
    mutationFn: (id) => promotionService.remove(id),
  });
}

export function useActivePromotions() {
  return useQuery({
    queryKey: ["promotions", "active"],
    queryFn: promotionService.getActive,
  });
}

export function useEnablePromotion() {
  return useMutation({
    mutationFn: (id) => promotionService.enable(id),
  });
}

export function useDisablePromotion() {
  return useMutation({
    mutationFn: (id) => promotionService.disable(id),
  });
}