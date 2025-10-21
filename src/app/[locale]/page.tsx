import { Category, SortOptions } from '@/lib/definitions';
import CategorySelector from '@/ui/CategorySelector';
import Search from '@/ui/Search';
import SortSelector from '@/ui/SortSelector';
import TransactionsList from '@/ui/TransactionsList';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Suspense } from 'react';
import { TransactionsListSkeleton } from '@/ui/TransactionsSkeleton';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    limit?: string;
    sort?: string;
    category?: string;
  }>;
}) {
  const t = await getTranslations('TransactionsPage');

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const sort = (searchParams?.sort as SortOptions) || 'desc-date';
  const category = searchParams?.category as Category;

  return (
    <div
      role='document'
      className='grid grid-rows-[auto,1fr,auto] items-center justify-items-center min-h-screen'
    >
      <main id='main-content' className='flex-1 flex w-full flex-col md:p-4'>
        <header className='flex h-12 shrink-0 items-center justify-center md:rounded-lg bg-primary px-4 py-8 md:h-24'>
          <h1 className='text-white text-4xl'>{t('transactions')}</h1>
        </header>
        <section className='p-3 md:p-0'>
          <div className='mt-4 flex flex-col md:flex-row w-full md:justify-between gap-3 md:gap-8 md:mt-8'>
            <Search placeholder={t('searchPlaceholder')} />
            <CategorySelector />
            <SortSelector />
          </div>
        </section>
        <Suspense fallback={<TransactionsListSkeleton />}>
          <TransactionsList
            query={query}
            currentPage={currentPage}
            limit={limit}
            sort={sort}
            category={category}
          />
        </Suspense>
      </main>
      <footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>
        <p>Andoni Arrillaga</p>
      </footer>
    </div>
  );
}
