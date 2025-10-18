import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { providerService } from "../../services/providerServices/provider.service";

export function useProviders(params) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => providerService.getAll(params),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });
}

export function useProvider(id) {
  return useQuery({
    queryKey: ["provider", id],
    queryFn: () => providerService.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60,
  })
}

export function useCreateProvider() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => providerService.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["providers"] }),
  })
}

export function useUpdateProvider() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => providerService.update(id, payload),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["providers"] });
      if (vars?.id) qc.invalidateQueries({ queryKey: ["provider", vars.id] });
    },
  });
}