import { fetchTransactions } from '@/app/lib/data';
import { Category, SortOptions } from '@/app/lib/definitions';
import { formatCurrency, formatDateToLocal } from '../lib/utils';
import TransactionStatus from './TransactionStatus';
import Pagination from './Pagination';

export default async function TransactionsList({
  query,
  currentPage,
  limit,
  sort,
  category,
}: {
  query: string;
  currentPage: number;
  limit: number;
  sort: SortOptions;
  category?: Category;
}) {
  const { data, totalTransactions } = await fetchTransactions(
    query,
    currentPage,
    limit,
    sort,
    category
  );
  const totalPages = Math.ceil(totalTransactions / limit);

  return data && !!data.length ? (
    <div>
      <div className='mt-6 flow-root'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-xl bg-primary p-2 md:pt-0'>
            <div className='md:hidden'>
              <ul role='list' className='space-y-2'>
                {data?.map((transaction) => (
                  <li
                    key={transaction.id}
                    tabIndex={0}
                    aria-label={`Transacción ${transaction.description} con un importe de ${transaction.amount} euros`}
                    className='mb-2 w-full rounded-md bg-white p-4'
                  >
                    <div className='flex items-start justify-between border-b border-primary pb-4'>
                      <div>
                        <div className='mb-2 flex items-center font-bold text-xl'>
                          <p>{transaction.id}</p>
                        </div>
                        <div className='mb-2 flex items-center'>
                          <p>{transaction.category}</p>
                        </div>
                        <p className='text-sm text-primary'>
                          {transaction.description}
                        </p>
                      </div>
                      <p>{formatDateToLocal(transaction.date)}</p>
                    </div>
                    <div className='flex w-full items-center justify-between pt-4'>
                      <div>
                        <p className='text-xl font-medium'>
                          {formatCurrency(transaction.amount)}
                        </p>
                      </div>
                      <TransactionStatus
                        status={transaction.pending}
                        aria-label={
                          transaction.pending ? 'Pendiente' : 'Pagado'
                        }
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <table
              className='hidden min-w-full text-gray-50 md:table'
              aria-label='Lista de Transacciones'
            >
              <thead className='rounded-lg text-left text-sm font-normal'>
                <tr>
                  <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                    Id
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Categoría
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Descripción
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Cantidad
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Fecha
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white text-primary'>
                {data?.map((transaction) => (
                  <tr
                    key={transaction.id}
                    tabIndex={0}
                    aria-label={`Transacción ${transaction.description} con un importe de ${transaction.amount} euros`}
                    className='w-full border-b border-primary py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                  >
                    <td className='whitespace-nowrap py-3 pl-6'>
                      {transaction.id}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {transaction.category}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {transaction.description}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {formatDateToLocal(transaction.date)}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      <TransactionStatus
                        status={transaction.pending}
                        aria-label={
                          transaction.pending ? 'Pendiente' : 'Pagado'
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <section className='mt-5 w-full justify-center flex'>
        <Pagination totalPages={totalPages} />
      </section>
    </div>
  ) : (
    <div className='flex h-32 w-full items-center justify-center'>
      <p>No transactions available.</p>
    </div>
  );
}
