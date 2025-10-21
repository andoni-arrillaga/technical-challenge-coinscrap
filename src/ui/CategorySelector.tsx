'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

type Category = 'Groceries' | 'Income' | 'Subscriptions' | 'Dining';

export default function CategorySelector() {
  const t = useTranslations('TransactionsList');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [field, setField] = useState<Category | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as Category | 'All';
    if (next === 'All') {
      setField(undefined);
    } else {
      setField(next);
    }

    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (next === 'All') {
      params.delete('category');
    } else {
      params.set('category', next);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='flex items-center'>
      <label className='sr-only'>{t('category')}:</label>
      <select
        value={field}
        onChange={handleChange}
        className='w-full rounded-full border-5 border-primary p-2 text-sm text-primary'
      >
        <option value='All'>{t('allCategories')}</option>
        <option value='Groceries'>{t('groceries')}</option>
        <option value='Income'>{t('income')}</option>
        <option value='Subscriptions'>{t('subscriptions')}</option>
        <option value='Dining'>{t('dining')}</option>
      </select>
    </div>
  );
}
