import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMovieStore } from '@/store/movieStore';
import { useToastStore } from '@/store/toastStore';
import type { FavoriteMovie, Movie, MovieDetails } from '@/types/movie';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  movie: FavoriteMovie | Movie | MovieDetails;
  className?: string;
  compact?: boolean;
}

export function FavoriteButton({ movie, className, compact = false }: FavoriteButtonProps) {
  const isFavorite = useMovieStore((state) => state.isFavorite(movie.id));
  const toggleFavorite = useMovieStore((state) => state.toggleFavorite);
  const showToast = useToastStore((state) => state.showToast);

  const handleFavoriteClick = () => {
    toggleFavorite(movie);

    if (!isFavorite) {
      showToast('Success Add to Favorites');
    }
  };

  return (
    <Button
      type="button"
      variant="icon"
      size="icon"
      className={cn('shrink-0', compact ? 'h-12 w-12 md:h-9 md:w-9' : 'h-12 w-12', className)}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      onClick={handleFavoriteClick}
    >
      <Heart
        className={cn('h-5 w-5', isFavorite ? 'fill-[#bd1d0d] text-[#bd1d0d]' : 'text-white/80')}
        aria-hidden="true"
      />
    </Button>
  );
}
