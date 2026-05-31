import type { Lead, CreateLeadDto, UpdateLeadDto, LeadStatus } from '../types/lead';

const BASE_URL = 'http://localhost:3001/leads';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const body = await res.json();
      message = body.message || body.error || JSON.stringify(body);
    } catch {
      // keep default message
    }
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

export async function getLeads(): Promise<Lead[]> {
  const res = await fetch(`${BASE_URL}?_sort=updated_at&_order=desc`);
  return handleResponse<Lead[]>(res);
}

export async function getLead(id: string): Promise<Lead> {
  const res = await fetch(`${BASE_URL}/${id}`);
  return handleResponse<Lead>(res);
}

export async function createLead(data: CreateLeadDto): Promise<Lead> {
  const now = new Date().toISOString();
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, status: 'NEW', created_at: now, updated_at: now }),
  });
  return handleResponse<Lead>(res);
}

export async function updateLead(id: string, data: UpdateLeadDto): Promise<Lead> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, updated_at: new Date().toISOString() }),
  });
  return handleResponse<Lead>(res);
}

export async function updateStatus(id: string, status: LeadStatus): Promise<Lead> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, updated_at: new Date().toISOString() }),
  });
  return handleResponse<Lead>(res);
}

export async function deleteLead(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Delete failed with status ${res.status}`);
}
