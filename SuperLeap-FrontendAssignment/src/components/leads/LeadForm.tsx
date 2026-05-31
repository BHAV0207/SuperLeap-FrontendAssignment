import { useState, useEffect } from 'react';
import type { Lead, CreateLeadDto } from '../../types/lead';
import './LeadForm.css';

const SOURCE_OPTIONS = ['website', 'referral', 'campaign', 'other'];

interface FormState {
  name: string;
  email: string;
  phone: string;
  source: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) {
    errors.name = 'Name is required.';
  }
  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Must be a valid email address.';
  }
  return errors;
}

interface Props {
  defaultValues?: Partial<Lead>;
  onSubmit: (data: CreateLeadDto) => void;
  onCancel: () => void;
  isPending: boolean;
  serverError?: string;
  submitLabel?: string;
}

export default function LeadForm({
  defaultValues,
  onSubmit,
  onCancel,
  isPending,
  serverError,
  submitLabel = 'Save',
}: Props) {
  const [values, setValues] = useState<FormState>({
    name: defaultValues?.name ?? '',
    email: defaultValues?.email ?? '',
    phone: defaultValues?.phone ?? '',
    source: defaultValues?.source ?? '',
  });
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});

  // Re-sync if defaultValues change (e.g. edit page loads async data)
  useEffect(() => {
    if (defaultValues) {
      setValues({
        name: defaultValues.name ?? '',
        email: defaultValues.email ?? '',
        phone: defaultValues.phone ?? '',
        source: defaultValues.source ?? '',
      });
    }
  }, [defaultValues?.id]);

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(field: keyof FormState, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleBlur(field: keyof FormState) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (!isValid) return;
    onSubmit({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim() || undefined,
      source: values.source || undefined,
    });
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      {serverError && (
        <div className="lead-form__server-error" role="alert">
          {serverError}
        </div>
      )}

      <div className="lead-form__field">
        <label htmlFor="lf-name" className="lead-form__label">
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="lf-name"
          type="text"
          className={`lead-form__input ${touched.name && errors.name ? 'lead-form__input--error' : ''}`}
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          placeholder="Full name"
          autoComplete="name"
          aria-required="true"
          aria-describedby={touched.name && errors.name ? 'lf-name-err' : undefined}
        />
        {touched.name && errors.name && (
          <p id="lf-name-err" className="lead-form__error" role="alert">{errors.name}</p>
        )}
      </div>

      <div className="lead-form__field">
        <label htmlFor="lf-email" className="lead-form__label">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="lf-email"
          type="email"
          className={`lead-form__input ${touched.email && errors.email ? 'lead-form__input--error' : ''}`}
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          placeholder="email@example.com"
          autoComplete="email"
          aria-required="true"
          aria-describedby={touched.email && errors.email ? 'lf-email-err' : undefined}
        />
        {touched.email && errors.email && (
          <p id="lf-email-err" className="lead-form__error" role="alert">{errors.email}</p>
        )}
      </div>

      <div className="lead-form__row">
        <div className="lead-form__field">
          <label htmlFor="lf-phone" className="lead-form__label">Phone</label>
          <input
            id="lf-phone"
            type="tel"
            className="lead-form__input"
            value={values.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="Optional"
            autoComplete="tel"
          />
        </div>

        <div className="lead-form__field">
          <label htmlFor="lf-source" className="lead-form__label">Source</label>
          <select
            id="lf-source"
            className="lead-form__input lead-form__select"
            value={values.source}
            onChange={(e) => handleChange('source', e.target.value)}
          >
            <option value="">Select…</option>
            {SOURCE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="lead-form__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={isPending}>
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn--primary"
          disabled={!isValid || isPending}
          aria-disabled={!isValid || isPending}
        >
          {isPending ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  );
}
