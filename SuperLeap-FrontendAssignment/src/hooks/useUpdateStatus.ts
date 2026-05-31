import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStatus } from '../api/leads';
import type { LeadStatus } from '../types/lead';

export function useUpdateStatus(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: LeadStatus) => updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead', id] });
    },
  });
}
