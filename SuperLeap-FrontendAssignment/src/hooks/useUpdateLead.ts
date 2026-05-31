import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLead } from '../api/leads';
import type { UpdateLeadDto } from '../types/lead';

export function useUpdateLead(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateLeadDto) => updateLead(id, data),
    onSuccess: (updatedLead) => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.setQueryData(['lead', id], updatedLead);
    },
  });
}
