import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLead } from '../api/leads';
import type { Lead } from '../types/lead';

export function useDeleteLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteLead(id),
    onMutate: async (id) => {
      // Optimistic update: cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['leads'] });

      // Snapshot the previous value
      const previousLeads = queryClient.getQueryData<Lead[]>(['leads']);

      // Optimistically update to the new value
      if (previousLeads) {
        queryClient.setQueryData(['leads'], previousLeads.filter(l => l.id !== id));
      }

      return { previousLeads };
    },
    onError: (_err, _id, context) => {
      // Rollback if delete fails
      if (context?.previousLeads) {
        queryClient.setQueryData(['leads'], context.previousLeads);
      }
    },
    onSettled: () => {
      // Always refetch to stay in sync
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}
