import { Link } from 'react-router-dom';
import movieLogoIcon from '@/assets/Movie Logo.png';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link to="/" className={cn('inline-flex items-center gap-2 text-white', className)}>
      <img className="h-5 w-5 md:h-6 md:w-6" src={movieLogoIcon} alt="" aria-hidden="true" />
      <span className="text-xl font-extrabold tracking-normal md:text-[28px]">Movie</span>
    </Link>
  );
}
