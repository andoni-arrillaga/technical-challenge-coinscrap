import {
  Category,
  Response,
  SortOptions,
  TransactionsItem,
} from './definitions';

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

export async function fetchTransactions(
  query: string,
  currentPage: number,
  limit: number,
  sort: SortOptions,
  category?: Category
): Promise<Response<TransactionsItem[]>> {
  const baseUrl = getBaseUrl();
  const res = await fetch(
    `${baseUrl}/api/transactions?query=${query}&page=${currentPage}&limit=${limit}&sort=${sort}${
      category ? `&category=${category}` : ''
    }`,
    {
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return res.json();
}
