'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

type SortField = 'asc-date' | 'desc-date' | 'asc-amount' | 'desc-amount';

export default function SortSelector() {
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
      <label className='sr-only'>Ordenar por:</label>
      <select
        value={field}
        onChange={handleChange}
        className='w-full rounded-full border-5 border-primary p-2 text-sm text-primary'
      >
        <option value='asc-date'>Fecha (ascendente)</option>
        <option value='desc-date'>Fecha (descendente)</option>
        <option value='asc-amount'>Cantidad (ascendente)</option>
        <option value='desc-amount'>Cantidad (descendente)</option>
      </select>
    </div>
  );
}
