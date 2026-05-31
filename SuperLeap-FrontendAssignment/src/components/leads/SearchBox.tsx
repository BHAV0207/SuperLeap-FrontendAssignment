import { Search, X } from 'lucide-react';
import './SearchBox.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: Props) {
  return (
    <div className="search-box">
      <Search className="search-box__icon" size={16} />
      <input
        id="leads-search"
        type="text"
        className="search-box__input"
        placeholder="Search by name or email…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search leads by name or email"
      />
      {value && (
        <button
          className="search-box__clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
