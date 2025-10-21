import { Category, SortOptions } from '@/lib/definitions';
import { formatCurrency, formatDateToLocal } from '@/lib/utils';
import TransactionStatus from './TransactionStatus';
import Pagination from './Pagination';
import { fetchTransactions } from '@/lib/data';
import { getTranslations } from 'next-intl/server';

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
  const t = await getTranslations('TransactionsList');
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
                    aria-label={`${t('id')}: ${transaction.id}, ${t(
                      'category'
                    )}: ${transaction.category}, ${t('description')}: ${
                      transaction.description
                    }, ${t('date')}: ${formatDateToLocal(
                      transaction.date
                    )}, ${t('amount')}: ${formatCurrency(
                      transaction.amount
                    )}, ${t('status')}: ${
                      transaction.pending ? t('pending') : t('paid')
                    }`}
                    className='mb-2 w-full rounded-md bg-white p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary'
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
                          transaction.pending ? t('pending') : t('paid')
                        }
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <table
              className='hidden min-w-full text-gray-50 md:table'
              aria-label={t('transactionsList')}
            >
              <caption className='sr-only'>{t('transactionsList')}</caption>
              <thead className='rounded-lg text-left text-sm font-normal'>
                <tr>
                  <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                    {t('id')}
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    {t('category')}
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    {t('description')}
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    {t('amount')}
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    {t('date')}
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    {t('status')}
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white text-primary'>
                {data?.map((transaction) => (
                  <tr
                    key={transaction.id}
                    tabIndex={0}
                    aria-label={`${t('id')}: ${transaction.id}, ${t(
                      'category'
                    )}: ${transaction.category}, ${t('description')}: ${
                      transaction.description
                    }, ${t('date')}: ${formatDateToLocal(
                      transaction.date
                    )}, ${t('amount')}: ${formatCurrency(
                      transaction.amount
                    )}, ${t('status')}: ${
                      transaction.pending ? t('pending') : t('paid')
                    }`}
                    className='w-full border-b border-primary py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary'
                  >
                    <td className='whitespace-nowrap py-3 pl-6'>
                      {transaction.id}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {t(
                        `categoryOption.${transaction.category.toLowerCase()}`
                      )}
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
                          transaction.pending ? t('pending') : t('paid')
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
    <div
      className='flex h-32 w-full items-center justify-center'
      role='status'
      aria-live='polite'
    >
      <p>No transactions available.</p>
    </div>
  );
}
