import { useQuery } from '@tanstack/react-query';
import { getLeads } from '../api/leads';

export function useLeads() {
  return useQuery({
    queryKey: ['leads'],
    queryFn: getLeads,
  });
}
