import type { LeadStatus } from '../../types/lead';
import { STATUS_LABELS } from '../../types/lead';
import './StatusBadge.css';

interface Props {
  status: LeadStatus;
}

export default function StatusBadge({ status }: Props) {
  return (
    <span className={`status-badge status-badge--${status.toLowerCase()}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
