'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = useMemo(
    () => generatePagination(currentPage, totalPages),
    [currentPage, totalPages]
  );

  return (
    <nav aria-label='Paginación' className='inline-flex'>
      <PaginationArrow
        direction='left'
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
        ariaLabel='Página anterior'
      />

      <div className='flex -space-x-px' role='list'>
        {allPages.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined;

          if (index === 0) position = 'first';
          if (index === allPages.length - 1) position = 'last';
          if (allPages.length === 1) position = 'single';
          if (page === '...') position = 'middle';

          return (
            <PaginationNumber
              key={`${page}-${index}`}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
              ariaLabel={
                currentPage === page
                  ? `Página actual ${page}`
                  : `Ir a la página ${page}`
              }
            />
          );
        })}
      </div>

      <PaginationArrow
        direction='right'
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
        ariaLabel={`Página siguiente`}
      />
    </nav>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
  ariaLabel,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
  ariaLabel: string;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border border-primary text-primary',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-primary text-white': isActive,
      'hover:bg-primary hover:opacity-20': !isActive && position !== 'middle',
      'text-primary opacity-20': position === 'middle',
    }
  );

  return isActive || position === 'middle' ? (
    <div className={className} aria-current={isActive ? 'page' : undefined}>
      {page}
    </div>
  ) : (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
  ariaLabel,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
  ariaLabel: string;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border border-primary',
    {
      'pointer-events-none text-primary opacity-20': isDisabled,
      'hover:bg-primary hover:opacity-20': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    }
  );

  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className='w-4 text-primary' />
    ) : (
      <ArrowRightIcon className='w-4 text-primary' />
    );

  return isDisabled ? (
    <div className={className} aria-disabled='true' aria-label={ariaLabel}>
      {icon}
    </div>
  ) : (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {icon}
    </Link>
  );
}
