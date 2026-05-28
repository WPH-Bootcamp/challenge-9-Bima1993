import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again in a moment.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="grid min-h-[420px] place-items-center px-6 text-center">
      <div className="grid max-w-sm justify-items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-white/5 text-red-300 ring-1 ring-white/10">
          <AlertCircle className="h-8 w-8" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-extrabold">{title}</h1>
          <p className="text-sm text-white/45">{description}</p>
        </div>
        {onRetry ? (
          <Button type="button" onClick={onRetry}>
            Try Again
          </Button>
        ) : null}
      </div>
    </div>
  );
}
