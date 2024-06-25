import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettingsAPI } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const {
    mutate: updateSettings,
    isLoading: isUpdating,
    error,
  } = useMutation({
    mutationFn: updateSettingsAPI,
    onSuccess: () => {
      toast.success("Settings successfully updated.");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateSettings, isUpdating, error };
}
