import { useParams, useNavigate } from 'react-router-dom';
import { useLead } from '../hooks/useLead';
import { useUpdateLead } from '../hooks/useUpdateLead';
import LeadForm from '../components/leads/LeadForm';
import { LoadingSpinner, ErrorMessage } from '../components/ui/States';
import { ArrowLeft } from 'lucide-react';
import './EditLeadPage.css';

export default function EditLeadPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: lead, isLoading, isError, error } = useLead(id || '');
  const { mutate: updateLead, isPending: isUpdating, error: updateError } = useUpdateLead(id || '');

  function handleBack() {
    navigate('/leads');
  }

  function handleSubmit(data: any) {
    updateLead(data, {
      onSuccess: () => {
        navigate('/leads');
      },
    });
  }

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error instanceof Error ? error.message : 'Lead not found.'} />;

  return (
    <div className="edit-lead-page">
      <div className="edit-lead-page__header">
        <button className="btn btn--ghost btn--icon" onClick={handleBack} aria-label="Go back">
          <ArrowLeft size={18} />
        </button>
        <h1 className="edit-lead-page__title">Edit Lead</h1>
      </div>
      
      <div className="edit-lead-page__card">
        <LeadForm
          defaultValues={lead}
          onSubmit={handleSubmit}
          onCancel={handleBack}
          isPending={isUpdating}
          serverError={updateError instanceof Error ? updateError.message : undefined}
          submitLabel="Update Lead"
        />
      </div>
    </div>
  );
}
