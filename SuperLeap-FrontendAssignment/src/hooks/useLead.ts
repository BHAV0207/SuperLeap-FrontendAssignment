import { useQuery } from '@tanstack/react-query';
import { getLead } from '../api/leads';

export function useLead(id: string) {
  return useQuery({
    queryKey: ['lead', id],
    queryFn: () => getLead(id),
    enabled: !!id,
  });
}
