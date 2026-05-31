import type { LeadStatus } from '../../types/lead';
import { STATUS_LABELS } from '../../types/lead';
import './StatusFilter.css';

const ALL_STATUSES: LeadStatus[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST'];

interface Props {
  selected: LeadStatus | 'ALL';
  onChange: (status: LeadStatus | 'ALL') => void;
}

export default function StatusFilter({ selected, onChange }: Props) {
  return (
    <div className="status-filter" role="group" aria-label="Filter by status">
      <button
        className={`status-filter__chip ${selected === 'ALL' ? 'status-filter__chip--active' : ''}`}
        onClick={() => onChange('ALL')}
        aria-pressed={selected === 'ALL'}
      >
        All
      </button>
      {ALL_STATUSES.map((status) => (
        <button
          key={status}
          className={`status-filter__chip status-filter__chip--${status.toLowerCase()} ${selected === status ? 'status-filter__chip--active' : ''}`}
          onClick={() => onChange(status)}
          aria-pressed={selected === status}
        >
          {STATUS_LABELS[status]}
        </button>
      ))}
    </div>
  );
}
