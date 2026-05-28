import playLogo from '@/assets/Play Logo.png';
import { cn } from '@/lib/utils';

interface PlayIconProps {
  className?: string;
}

export function PlayIcon({ className }: PlayIconProps) {
  return <img className={cn('h-4 w-4 object-contain', className)} src={playLogo} alt="" aria-hidden="true" />;
}
