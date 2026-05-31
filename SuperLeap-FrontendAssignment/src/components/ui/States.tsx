import { Loader2 } from 'lucide-react';
import './ui.css';

export function LoadingSpinner() {
  return (
    <div className="ui-state ui-state--loading" aria-label="Loading">
      <Loader2 className="spinner" size={28} />
      <p>Loading leads…</p>
    </div>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="ui-state ui-state--error" role="alert">
      <p className="ui-state__title">Something went wrong</p>
      <p className="ui-state__desc">{message}</p>
    </div>
  );
}

export function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div className="ui-state ui-state--empty">
      <p className="ui-state__title">{filtered ? 'No leads match your filters' : 'No leads yet'}</p>
      <p className="ui-state__desc">
        {filtered ? 'Try adjusting your search or status filter.' : 'Add your first lead to get started.'}
      </p>
    </div>
  );
}
