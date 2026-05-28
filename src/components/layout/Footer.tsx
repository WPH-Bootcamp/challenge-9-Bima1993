import { Logo } from '@/components/layout/Logo';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex min-h-24 w-full max-w-6xl flex-col items-start justify-center gap-3 px-6 py-7 md:flex-row md:items-center md:justify-between md:gap-4 md:px-10">
        <Logo className="scale-90 origin-left" />
        <p className="text-xs font-medium text-white/30">Copyright ©2025 Movie Explorer</p>
      </div>
    </footer>
  );
}
