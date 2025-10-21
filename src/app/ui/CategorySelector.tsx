'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

type Category = 'Groceries' | 'Income' | 'Subscriptions' | 'Dining';

export default function CategorySelector() {
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
      <label className='sr-only'>Categoría:</label>
      <select
        value={field}
        onChange={handleChange}
        className='w-full rounded-full border-5 border-primary p-2 text-sm text-primary'
      >
        <option value='All'>Todas las categorías</option>
        <option value='Groceries'>Supermercado</option>
        <option value='Income'>Ingresos</option>
        <option value='Subscriptions'>Suscripciones</option>
        <option value='Dining'>Comedor</option>
      </select>
    </div>
  );
}
