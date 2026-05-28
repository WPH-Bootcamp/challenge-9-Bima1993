import { Link } from 'react-router-dom';
import dataNotFoundImage from '@/assets/Data Not Found Logo.png';
import emptyFavoriteImage from '@/assets/Empty Favorite Logo.png';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
  variant?: 'empty' | 'not-found';
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
  variant = 'empty',
}: EmptyStateProps) {
  const imageSrc = variant === 'not-found' ? dataNotFoundImage : emptyFavoriteImage;

  return (
    <div className="grid min-h-[520px] place-items-center px-6 text-center">
      <div className="grid justify-items-center gap-5">
        <img className="h-32 w-32 object-contain opacity-75" src={imageSrc} alt="" aria-hidden="true" />
        <div className="space-y-2">
          <h1 className="text-base font-extrabold text-white">{title}</h1>
          <p className="text-sm font-medium text-white/38">{description}</p>
        </div>
        {actionLabel && actionTo ? (
          <Button asChild className="mt-2 h-[52px] w-[min(300px,calc(100vw-48px))]">
            <Link to={actionTo}>{actionLabel}</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
