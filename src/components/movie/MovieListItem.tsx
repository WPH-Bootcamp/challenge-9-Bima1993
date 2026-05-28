import { Star } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { IMAGE_SIZES } from '@/lib/constants';
import { cn, formatRating, getImageUrl } from '@/lib/utils';
import type { FavoriteMovie, Movie } from '@/types/movie';
import { PlayIcon } from '@/components/movie/PlayIcon';

type ListMovie = Movie | FavoriteMovie;

interface MovieListItemProps {
  movie: ListMovie;
  action?: ReactNode;
  className?: string;
}

export function MovieListItem({ movie, action, className }: MovieListItemProps) {
  return (
    <article className={cn('border-b border-white/10 py-6 last:border-b-0 md:flex md:gap-5 md:py-8', className)}>
      <div className="flex gap-4 md:contents">
        <Link to={`/movie/${movie.id}`} className="shrink-0">
          <img
            className="h-[156px] w-[104px] rounded-lg object-cover ring-1 ring-white/10 md:h-48 md:w-36"
            src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.medium)}
            alt={movie.title}
            loading="lazy"
          />
        </Link>

        <div className="min-w-0 flex-1 pt-0 md:pt-1">
          <Link to={`/movie/${movie.id}`}>
            <h2 className="line-clamp-2 text-base font-extrabold leading-8 text-white transition hover:text-white/75 md:text-xl md:leading-tight">
              {movie.title}
            </h2>
          </Link>
          <p className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-white/75 md:mt-2">
            <Star className="h-4 w-4 fill-[#ffc400] text-[#ffc400]" aria-hidden="true" />
            {formatRating(movie.vote_average)}/10
          </p>
          <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-white/48 md:mt-4 md:leading-7 md:text-white/42">
            {movie.overview || 'No overview available.'}
          </p>
          <Button asChild size="sm" className="mt-5 hidden md:inline-flex">
            <Link to={`/movie/${movie.id}`}>
              Watch Trailer
              <PlayIcon />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 md:hidden">
        <Button asChild size="sm" className="h-12 flex-1">
          <Link to={`/movie/${movie.id}`}>
            Watch Trailer
            <PlayIcon />
          </Link>
        </Button>
        {action ? <div>{action}</div> : null}
      </div>

      {action ? <div className="hidden pt-1 md:block">{action}</div> : null}
    </article>
  );
}
