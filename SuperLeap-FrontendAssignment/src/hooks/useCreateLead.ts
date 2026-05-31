import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLead } from '../api/leads';
import type { CreateLeadDto } from '../types/lead';

export function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLeadDto) => createLead(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}
