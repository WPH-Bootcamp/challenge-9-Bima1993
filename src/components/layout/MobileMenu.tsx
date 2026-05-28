import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Logo } from '@/components/layout/Logo';

export function MobileMenu() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="grid h-10 w-10 place-items-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white md:hidden"
          type="button"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed inset-0 z-50 h-dvh w-screen border border-white/20 bg-black px-4 py-5 text-white shadow-2xl">
          <div className="mb-11 flex items-start justify-between">
            <Dialog.Title asChild>
              <Logo className="scale-[0.58] origin-left" />
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="grid h-6 w-6 place-items-center text-white/85 transition hover:text-white"
                type="button"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>
          <nav className="grid gap-8 text-xs font-medium text-white">
            <Dialog.Close asChild>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'text-white' : '')}>
                Home
              </NavLink>
            </Dialog.Close>
            <Dialog.Close asChild>
              <NavLink
                to="/favorites"
                className={({ isActive }) => (isActive ? 'text-white' : '')}
            >
                Favorites
              </NavLink>
            </Dialog.Close>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
