import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import type { Lead, LeadStatus } from '../types/lead';
import { useLeads } from '../hooks/useLeads';
import { useCreateLead } from '../hooks/useCreateLead';
import LeadsTable from '../components/leads/LeadsTable';
import StatusFilter from '../components/leads/StatusFilter';
import SearchBox from '../components/leads/SearchBox';
import Modal from '../components/ui/Modal';
import LeadForm from '../components/leads/LeadForm';
import { LoadingSpinner, ErrorMessage } from '../components/ui/States';
import '../components/ui/ui.css';
import './LeadsPage.css';

export default function LeadsPage() {
  const { data: leads, isLoading, isError, error } = useLeads();
  const { mutate: createLead, isPending: isCreating, error: createError } = useCreateLead();
  
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!leads) return [];
    return leads.filter((lead) => {
      const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [leads, statusFilter, search]);

  const isFiltered = statusFilter !== 'ALL' || search.trim() !== '';

  function handleDelete(lead: Lead) {
    // Wired in Part 4
    console.log('delete', lead.id);
  }

  function handleCreate(data: any) {
    createLead(data, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  }

  return (
    <div className="leads-page">
      <div className="leads-page__header">
        <div>
          <h1 className="leads-page__title">Leads</h1>
          {leads && (
            <p className="leads-page__subtitle">
              {filtered.length} of {leads.length} leads
            </p>
          )}
        </div>
        <button 
          className="btn btn--primary" 
          id="add-lead-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} />
          Add Lead
        </button>
      </div>

      <div className="leads-page__toolbar">
        <StatusFilter selected={statusFilter} onChange={setStatusFilter} />
        <SearchBox value={search} onChange={setSearch} />
      </div>

      {isLoading && <LoadingSpinner />}
      {isError && (
        <ErrorMessage
          message={error instanceof Error ? error.message : 'Failed to load leads.'}
        />
      )}
      {!isLoading && !isError && (
        <LeadsTable
          leads={filtered}
          isFiltered={isFiltered}
          onDelete={handleDelete}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Lead"
      >
        <LeadForm
          onSubmit={handleCreate}
          onCancel={() => setIsModalOpen(false)}
          isPending={isCreating}
          serverError={createError instanceof Error ? createError.message : undefined}
          submitLabel="Create Lead"
        />
      </Modal>
    </div>
  );
}
