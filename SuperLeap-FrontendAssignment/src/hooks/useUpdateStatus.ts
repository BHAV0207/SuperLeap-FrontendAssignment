import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStatus } from '../api/leads';
import type { LeadStatus, Lead } from '../types/lead';

export function useUpdateStatus(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: LeadStatus) => updateStatus(id, status),
    onMutate: async (status) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['leads'] });
      await queryClient.cancelQueries({ queryKey: ['lead', id] });

      const previousLeads = queryClient.getQueryData<Lead[]>(['leads']);
      const previousLead = queryClient.getQueryData<Lead>(['lead', id]);

      if (previousLeads) {
        queryClient.setQueryData(['leads'], previousLeads.map(l => 
          l.id === id ? { ...l, status, updated_at: new Date().toISOString() } : l
        ));
      }

      if (previousLead) {
        queryClient.setQueryData(['lead', id], { ...previousLead, status, updated_at: new Date().toISOString() });
      }

      return { previousLeads, previousLead };
    },
    onError: (_err, _status, context) => {
      if (context?.previousLeads) queryClient.setQueryData(['leads'], context.previousLeads);
      if (context?.previousLead) queryClient.setQueryData(['lead', id], context.previousLead);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead', id] });
    },
  });
}
