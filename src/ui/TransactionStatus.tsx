import clsx from 'clsx';
import { useTranslations } from 'next-intl';

export default function TransactionStatus({ status }: { status: boolean }) {
  const t = useTranslations('TransactionsList');

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
      {status ? <>{t('pending')}</> : <>{t('paid')}</>}
    </span>
  );
}
