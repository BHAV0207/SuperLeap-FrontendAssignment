import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import type { Lead, LeadStatus } from '../../types/lead';
import StatusBadge from './StatusBadge';
import { EmptyState } from '../ui/States';
import './LeadsTable.css';
import '../ui/ui.css';

interface Props {
  leads: Lead[];
  isFiltered: boolean;
  onDelete: (lead: Lead) => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

const SOURCE_LABELS: Record<string, string> = {
  website: 'Website',
  referral: 'Referral',
  campaign: 'Campaign',
};

export default function LeadsTable({ leads, isFiltered, onDelete }: Props) {
  const navigate = useNavigate();

  if (leads.length === 0) {
    return <EmptyState filtered={isFiltered} />;
  }

  return (
    <div className="table-wrapper">
      <table className="leads-table">
        <caption className="sr-only">Leads list</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Source</th>
            <th scope="col">Last Updated</th>
            <th scope="col"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="leads-table__row">
              <td className="leads-table__name">{lead.name}</td>
              <td className="leads-table__email">
                <a href={`mailto:${lead.email}`}>{lead.email}</a>
              </td>
              <td>
                <StatusBadge status={lead.status as LeadStatus} />
              </td>
              <td className="leads-table__source">
                {lead.source ? (SOURCE_LABELS[lead.source] ?? lead.source) : '—'}
              </td>
              <td className="leads-table__date">{formatDate(lead.updated_at)}</td>
              <td className="leads-table__actions">
                <button
                  className="btn btn--icon"
                  onClick={() => navigate(`/leads/${lead.id}/edit`)}
                  aria-label={`Edit ${lead.name}`}
                  title="Edit"
                >
                  <Pencil size={15} />
                </button>
                <button
                  className="btn btn--icon btn--icon-danger"
                  onClick={() => onDelete(lead)}
                  aria-label={`Delete ${lead.name}`}
                  title="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
