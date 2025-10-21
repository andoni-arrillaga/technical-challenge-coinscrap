import { Response, TransactionsItem } from './definitions';

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

export async function fetchTransactions(): Promise<
  Response<TransactionsItem[]>
> {
  const res = await fetch(`${getBaseUrl()}/api/transactions`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return res.json();
}
