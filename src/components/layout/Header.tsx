import { ArrowLeft, Search } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SearchForm } from '@/components/forms/SearchForm';
import { Logo } from '@/components/layout/Logo';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const location = useLocation();
  const isSearchPage = location.pathname === '/search';
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = isSearchPage ? searchParams.get('query') ?? '' : '';

  return (
    <header className="fixed left-0 top-0 z-40 w-full border-b border-white/5 bg-black/20 backdrop-blur-md">
      <div className="relative mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-3 px-4 md:px-10">
        {isSearchPage ? (
          <div className="flex flex-1 items-center gap-3 md:hidden">
            <Button variant="ghost" size="icon" asChild aria-label="Back to home">
              <Link to="/">
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <SearchForm className="flex-1" initialQuery={initialQuery} autoFocus />
          </div>
        ) : (
          <Logo className="md:hidden" />
        )}

        <Logo className="hidden md:inline-flex" />

        <nav className="hidden items-center gap-16 text-sm font-semibold text-white/70 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) => cn('transition hover:text-white', isActive && 'text-white')}
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => cn('transition hover:text-white', isActive && 'text-white')}
          >
            Favorites
          </NavLink>
        </nav>

        <div className="hidden w-56 md:block">
          <SearchForm initialQuery={initialQuery} />
        </div>

        {!isSearchPage ? (
          <div className="z-50 ml-auto flex items-center gap-1 md:hidden">
            <NavLink
              to="/search"
              className="grid h-10 w-10 place-items-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Open search"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </NavLink>
            <MobileMenu />
          </div>
        ) : null}
      </div>
    </header>
  );
}
