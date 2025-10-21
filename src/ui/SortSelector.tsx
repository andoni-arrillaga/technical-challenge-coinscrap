'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

type SortField = 'asc-date' | 'desc-date' | 'asc-amount' | 'desc-amount';

export default function SortSelector() {
  const t = useTranslations('TransactionsList');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [field, setField] = useState<SortField>('asc-date');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as SortField;
    setField(next);

    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('sort', next);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='flex items-center'>
      <label className='sr-only'>{t('sortBy')}:</label>
      <select
        value={field}
        onChange={handleChange}
        className='w-full rounded-full border-5 border-primary p-2 text-sm text-primary'
      >
        <option value='asc-date'>{t('sortByDateAsc')}</option>
        <option value='desc-date'>{t('sortByDateDesc')}</option>
        <option value='asc-amount'>{t('sortByAmountAsc')}</option>
        <option value='desc-amount'>{t('sortByAmountDesc')}</option>
      </select>
    </div>
  );
}
