import Modal from '../ui/Modal';
import type { Lead } from '../../types/lead';

interface Props {
  isOpen: boolean;
  lead: Lead | null;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
}

export default function DeleteDialog({ isOpen, lead, onClose, onConfirm, isPending }: Props) {
  if (!lead) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Lead"
    >
      <div className="delete-dialog">
        <p style={{ marginBottom: 'var(--space-4)', color: 'var(--color-text-secondary)' }}>
          Are you sure you want to delete <strong>{lead.name}</strong>? This action cannot be undone.
        </p>
        
        <div className="lead-form__actions">
          <button className="btn btn--ghost" onClick={onClose} disabled={isPending}>
            Cancel
          </button>
          <button 
            className="btn btn--danger" 
            onClick={onConfirm} 
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete Lead'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
