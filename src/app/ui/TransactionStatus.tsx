import clsx from 'clsx';

export default function TransactionStatus({ status }: { status: boolean }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status,
          'bg-green-600 text-white': !status,
        }
      )}
    >
      {status ? <>Pendiente</> : <>Pagado</>}
    </span>
  );
}
