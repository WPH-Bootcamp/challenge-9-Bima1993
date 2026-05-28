import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <div className="grid min-h-24 place-items-center rounded-lg border border-white/10 bg-black/65 px-5 py-4 text-center backdrop-blur-sm">
      <Icon className="mb-2 h-5 w-5 text-white" aria-hidden="true" />
      <p className="text-xs font-semibold text-white/45">{label}</p>
      <p className="mt-1 text-sm font-extrabold text-white">{value}</p>
    </div>
  );
}
