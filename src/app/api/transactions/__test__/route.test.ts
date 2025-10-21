import { Category, SortOptions } from '@/app/lib/definitions';
import { GET } from '../route';

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: Category;
  account?: string;
  pending?: boolean;
};

type TransactionParams = {
  query: string;
  currentPage: number;
  limit: number;
  sort: SortOptions;
  category?: Category;
};

function createMockRequest(method: string, params: TransactionParams): Request {
  const baseUrl = 'http://localhost:3000/api/transactions';
  const normalizedParams: Record<string, string> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;

    // Mapeamos `currentPage` → `page`
    const normalizedKey = key === 'currentPage' ? 'page' : key;
    normalizedParams[normalizedKey] = String(value);
  });
  const search = new URLSearchParams(normalizedParams).toString();
  const url = search ? `${baseUrl}?${search}` : baseUrl;

  const request: Request = {
    url,
    method,
    headers: { 'Content-Type': 'application/json' },
  } as unknown as Request;

  return request;
}

jest.mock('next/server', () => {
  return {
    NextResponse: {
      json: jest.fn((data, init) => {
        const status = init?.status || 200;
        return {
          ok: status >= 200 && status < 300,
          status,
          json: async () => data,
        };
      }),
    },
  };
});

describe('/api/transactions', () => {
  describe('GET', () => {
    it('should return a list of transactions', async () => {
      const params = {
        query: '',
        currentPage: 1,
        limit: 10,
        sort: 'desc-date' as SortOptions,
      };
      const response = await GET(createMockRequest('GET', params));
      const { data } = await response.json();

      expect(response.ok).toBe(true);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data.length).toBe(4);
      data.forEach((tx: Transaction) => {
        expect(tx).toHaveProperty('id');
        expect(tx).toHaveProperty('date');
        expect(tx).toHaveProperty('description');
        expect(tx).toHaveProperty('amount');
        expect(tx).toHaveProperty('category');
        expect(tx).toHaveProperty('account');
        expect(tx).toHaveProperty('pending');
      });
    });

    it('should filter transactions by search query', async () => {
      const params: TransactionParams = {
        query: 'Supermercado DIA',
        currentPage: 1,
        limit: 10,
        sort: 'desc-date',
      };
      const response = await GET(createMockRequest('GET', params));
      const { data } = await response.json();

      expect(response.ok).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(Array.isArray(data)).toBe(true);
      data.forEach((tx: Transaction) => {
        expect(tx.description).toContain('Supermercado DIA');
      });
    });

    it('should filter transactions by category', async () => {
      const params: TransactionParams = {
        query: '',
        currentPage: 1,
        limit: 10,
        sort: 'desc-date',
        category: 'Income',
      };
      const response = await GET(createMockRequest('GET', params));
      const { data } = await response.json();
      expect(response.ok).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(Array.isArray(data)).toBe(true);
      data.forEach((tx: Transaction) => {
        expect(tx.category).toBe('Income');
      });
    });

    it('should sort transactions by date ascending', async () => {
      const params = {
        query: '',
        currentPage: 1,
        limit: 10,
        sort: 'asc-date' as SortOptions,
      };
      const response = await GET(createMockRequest('GET', params));
      const { data } = await response.json();
      expect(response.ok).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(Array.isArray(data)).toBe(true);
      data.forEach((tx: Transaction) => {
        expect(tx.date).toBeDefined();
      });
      for (let i = 1; i < data.length; i++) {
        expect(new Date(data[i].date).getTime()).toBeGreaterThanOrEqual(
          new Date(data[i - 1].date).getTime()
        );
      }
    });

    it('should paginate results (limit + page)', async () => {
      const paramsPage1 = {
        query: '',
        currentPage: 1,
        limit: 2,
        sort: 'desc-date' as SortOptions,
      };
      const paramsPage2 = {
        query: '',
        currentPage: 2,
        limit: 2,
        sort: 'desc-date' as SortOptions,
      };

      const response1 = await GET(createMockRequest('GET', paramsPage1));
      const { data: data1 } = await response1.json();

      const response2 = await GET(createMockRequest('GET', paramsPage2));
      const { data: data2 } = await response2.json();

      expect(response1.ok).toBe(true);
      expect(response2.ok).toBe(true);

      expect(Array.isArray(data1)).toBe(true);
      expect(Array.isArray(data2)).toBe(true);

      expect(data1.length).toBeLessThanOrEqual(2);
      expect(data2.length).toBeLessThanOrEqual(2);

      // Asegurarse de que la página 2 contiene elementos diferentes a la página 1
      const idsPage1 = data1.map((x: Transaction) => x.id);
      const idsPage2 = data2.map((x: Transaction) => x.id);
      const intersection = idsPage2.filter((id: string) =>
        idsPage1.includes(id)
      );
      expect(intersection.length).toBe(0);
    });
  });
});
