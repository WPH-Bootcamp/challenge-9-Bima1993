import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { FavoriteButton } from '@/components/movie/FavoriteButton';
import { MovieListItem } from '@/components/movie/MovieListItem';
import { useSearchMovies } from '@/hooks/useMovies';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const searchQuery = useSearchMovies(query);
  const movies = searchQuery.data?.results ?? [];
  const canSearch = query.trim().length >= 2;

  return (
    <motion.section
      className="mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-6 pb-24 pt-28 md:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {!canSearch ? (
        <EmptyState
          title="Data Not Found"
          description="Try other keywords"
          variant="not-found"
        />
      ) : null}

      {canSearch && searchQuery.isLoading ? <LoadingState label="Searching movies" /> : null}

      {canSearch && searchQuery.isError ? (
        <ErrorState onRetry={() => void searchQuery.refetch()} />
      ) : null}

      {canSearch && searchQuery.isSuccess && movies.length === 0 ? (
        <EmptyState
          title="Data Not Found"
          description="Try other keywords"
          variant="not-found"
        />
      ) : null}

      {canSearch && movies.length > 0 ? (
        <div className="mx-auto max-w-4xl">
          <div className="space-y-0">
            {movies.slice(0, 8).map((movie) => (
              <MovieListItem
                key={movie.id}
                movie={movie}
                action={<FavoriteButton movie={movie} compact />}
              />
            ))}
          </div>
        </div>
      ) : null}
    </motion.section>
  );
}
