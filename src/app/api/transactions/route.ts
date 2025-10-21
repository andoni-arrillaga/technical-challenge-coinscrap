import { NextResponse } from 'next/server';

const transactions = [
  {
    id: 'tx_001',
    date: '2025-08-02',
    description: 'Supermercado DIA',
    amount: -37.45,
    category: 'Groceries',
    account: 'ES98...1234',
    pending: false,
  },
  {
    id: 'tx_002',
    date: '2025-08-03',
    description: 'Nómina',
    amount: 1450.0,
    category: 'Income',
    account: 'ES98...1234',
    pending: false,
  },
  {
    id: 'tx_003',
    date: '2025-08-04',
    description: 'Netflix',
    amount: -12.99,
    category: 'Subscriptions',
    account: 'ES98...1234',
    pending: false,
  },
  {
    id: 'tx_004',
    date: '2025-08-04',
    description: 'Café',
    amount: -2.1,
    category: 'Dining',
    account: 'ES98...1234',
    pending: true,
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query')?.toLowerCase() || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const sort = searchParams.get('sort') || 'desc-date';
  const category = searchParams.get('category');

  let filteredTransactions = transactions;
  if (query) {
    filteredTransactions = transactions.filter(
      (tx) =>
        tx.description.toLowerCase().includes(query) ||
        tx.category.toLowerCase().includes(query)
    );
  }
  filteredTransactions = filteredTransactions.sort((a, b) => {
    switch (sort) {
      case 'asc-date':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'desc-date':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'asc-amount':
        return a.amount - b.amount;
      case 'desc-amount':
        return b.amount - a.amount;
      default:
        return 0;
    }
  });
  if (category) {
    filteredTransactions = filteredTransactions.filter(
      (tx) => tx.category === category
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const data = filteredTransactions.slice(startIndex, endIndex);

  return NextResponse.json({
    data,
    totalTransactions: transactions.length,
  });
}
