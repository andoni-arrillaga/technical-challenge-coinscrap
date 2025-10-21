export type Response<T> = {
  data: T;
  totalTransactions?: number;
};

export type TransactionsItem = {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: Category;
  account: string;
  pending: boolean;
};

export type Category = 'Groceries' | 'Income' | 'Subscriptions' | 'Dining';
