import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Lock, Loader2 } from 'lucide-react';
import type { LeadStatus } from '../../types/lead';
import { VALID_TRANSITIONS, STATUS_LABELS } from '../../types/lead';
import StatusBadge from './StatusBadge';
import { useUpdateStatus } from '../../hooks/useUpdateStatus';
import './StatusChanger.css';

interface Props {
  id: string;
  currentStatus: LeadStatus;
}

export default function StatusChanger({ id, currentStatus }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { mutate: updateStatus, isPending } = useUpdateStatus(id);

  const nextStatuses = VALID_TRANSITIONS[currentStatus];
  const isLocked = nextStatuses.length === 0;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleTransition(status: LeadStatus) {
    updateStatus(status);
    setIsOpen(false);
  }

  if (isLocked) {
    return (
      <div className="status-changer status-changer--locked" title="Lead status is final and cannot be changed.">
        <StatusBadge status={currentStatus} />
        <Lock size={12} className="status-changer__lock-icon" />
      </div>
    );
  }

  return (
    <div className="status-changer" ref={dropdownRef}>
      <button 
        className="status-changer__trigger" 
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <StatusBadge status={currentStatus} />
        {isPending ? (
          <Loader2 size={12} className="spinner" style={{ marginLeft: 'var(--space-1)' }} />
        ) : (
          <ChevronDown size={12} className="status-changer__arrow" />
        )}
      </button>

      {isOpen && (
        <ul className="status-changer__menu" role="listbox">
          <li className="status-changer__menu-header">Change status to:</li>
          {nextStatuses.map((status) => (
            <li key={status} role="option">
              <button 
                className="status-changer__option" 
                onClick={() => handleTransition(status)}
              >
                {STATUS_LABELS[status]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
