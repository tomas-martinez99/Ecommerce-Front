// src/hooks/settings/useSettings.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSettings } from "../../services/settingsSetrvices/settings.service";

export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      // refrescar cache
      queryClient.invalidateQueries(["settings"]);
    },
  });
};