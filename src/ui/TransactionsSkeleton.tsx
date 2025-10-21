export function TransactionsMobileSkeleton() {
  return (
    <div className='mb-2 w-full rounded-md bg-white p-4'>
      <div className='flex items-start justify-between border-b border-primary opacity-25 pb-4'>
        <div>
          <div className='mb-2 flex items-center font-bold text-xl'>
            <div className='h-6 w-14 rounded bg-primary opacity-35' />
          </div>
          <div className='mb-2 flex items-center'>
            <div className='h-6 w-16 rounded bg-primary opacity-25' />
          </div>
          <div className='h-6 w-24 rounded bg-primary opacity-15' />
        </div>
        <div className='h-6 w-20 rounded bg-primary opacity-25' />
      </div>
      <div className='flex w-full items-center justify-between pt-4'>
        <div>
          <div className='h-6 w-24 rounded bg-primary opacity-35' />
        </div>
        <div className='h-6 w-24 rounded bg-primary opacity-25' />
      </div>
    </div>
  );
}

export function ListRowSkeleton() {
  return (
    <tr className='w-full border-b border-primary opacity-25 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'>
      {/* ID */}
      <td className='whitespace-nowrap py-3 pl-6'>
        <div className='h-6 w-14 rounded bg-primary opacity-50' />
      </td>
      {/* Category */}
      <td className='whitespace-nowrap px-3 py-3'>
        <div className='h-6 w-20 rounded bg-primary opacity-50' />
      </td>
      {/* Description */}
      <td className='whitespace-nowrap px-3 py-3'>
        <div className='h-6 w-40 rounded bg-primary opacity-50' />
      </td>
      {/* Amount */}
      <td className='whitespace-nowrap px-3 py-3'>
        <div className='h-6 w-20 rounded bg-primary opacity-50' />
      </td>
      {/* Date */}
      <td className='whitespace-nowrap px-3 py-3'>
        <div className='h-6 w-20 rounded bg-primary opacity-50' />
      </td>
      {/* Status */}
      <td className='whitespace-nowrap px-3 py-3'>
        <div className='h-6 w-20 rounded bg-primary opacity-50' />
      </td>
    </tr>
  );
}

export function TransactionsListSkeleton() {
  return (
    <div className='mt-6 flow-root'>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg bg-primary opacity-25 p-2 md:pt-0'>
          <div className='md:hidden'>
            <TransactionsMobileSkeleton />
            <TransactionsMobileSkeleton />
            <TransactionsMobileSkeleton />
            <TransactionsMobileSkeleton />
          </div>
          <table className='hidden min-w-full text-white md:table'>
            <thead className='rounded-lg text-left text-sm font-normal'>
              <tr>
                <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                  <div className='h-6 w-14 rounded bg-accent opacity-50' />
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  <div className='h-6 w-20 rounded bg-accent opacity-50' />
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  <div className='h-6 w-40 rounded bg-accent opacity-50' />
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  <div className='h-6 w-20 rounded bg-accent opacity-50' />
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  <div className='h-6 w-20 rounded bg-accent opacity-50' />
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  <div className='h-6 w-20 rounded bg-accent opacity-50' />
                </th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              <ListRowSkeleton />
              <ListRowSkeleton />
              <ListRowSkeleton />
              <ListRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
