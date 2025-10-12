import { useQuery  } from "@tanstack/react-query";
import { providerService } from "../../services/providerServices/provider.service";

export function useProviders(params) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => providerService.getAll(params),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });
}