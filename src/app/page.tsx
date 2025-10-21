import { fetchTransactions } from './lib/data';

export default async function Home() {
  const { data } = await fetchTransactions();

  return (
    <div className='font-sans grid grid-rows-[auto,1fr,auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      <main className='flex-1 flex w-full flex-col p-4'>
        {data && !!data.length ? (
          <div className='mt-6 flow-root'>
            <div className='inline-block min-w-full align-middle'>
              <div className='rounded-lg bg-primary p-2 md:pt-0'>
                <div className='md:hidden bg-accent'>
                  <ul role='list' className='space-y-2'>
                    {data.map((transaction) => (
                      <li
                        key={transaction.id}
                        className='p-4 rounded-lg shadow-sm'
                      >
                        <p>
                          <strong>id:</strong> {transaction.id}
                        </p>
                        <p>
                          <strong>date:</strong> {transaction.date}
                        </p>
                        <p>
                          <strong>description:</strong>{' '}
                          {transaction.description}
                        </p>
                        <p>
                          <strong>amount:</strong> {transaction.amount}
                        </p>
                        <p>
                          <strong>category:</strong> {transaction.category}
                        </p>
                        <p>
                          <strong>account:</strong> {transaction.account}
                        </p>
                        <p>
                          <strong>pending:</strong>{' '}
                          {transaction.pending ? 'Yes' : 'No'}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <table
                  className='hidden min-w-full text-gray-50 md:table md:mx-auto'
                  aria-label='Transactions List'
                >
                  <thead className='rounded-lg text-left text-sm font-normal'>
                    <tr>
                      <th className='p-4'>id</th>
                      <th className='p-4'>date</th>
                      <th className='p-4'>description</th>
                      <th className='p-4'>amount</th>
                      <th className='p-4'>category</th>
                      <th className='p-4'>account</th>
                      <th>pending</th>
                    </tr>
                  </thead>
                  <tbody className='bg-white text-primary'>
                    {data?.map((transaction) => (
                      <tr
                        key={transaction.id}
                        tabIndex={0}
                        aria-label={`Transaction ${transaction.description} with amount ${transaction.amount} euros`}
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
                          {`$${transaction.amount} €`}
                        </td>
                        <td className='whitespace-nowrap px-3 py-3'>
                          {transaction.date}
                        </td>
                        <td className='whitespace-nowrap px-3 py-3'>
                          {transaction.account}
                        </td>
                        <td className='whitespace-nowrap px-3 py-3'>
                          {transaction.pending ? 'Yes' : 'No'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <p>No transactions available.</p>
        )}
      </main>
      <footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>
        <p>Andoni Arrillaga</p>
      </footer>
    </div>
  );
}
