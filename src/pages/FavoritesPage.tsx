import { motion } from 'framer-motion';
import { EmptyState } from '@/components/common/EmptyState';
import { MovieListItem } from '@/components/movie/MovieListItem';
import { FavoriteButton } from '@/components/movie/FavoriteButton';
import { useMovieStore } from '@/store/movieStore';

export function FavoritesPage() {
  const favorites = useMovieStore((state) => state.favorites);

  return (
    <motion.section
      className="mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-6 pb-24 pt-32 md:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="mb-10 text-3xl font-extrabold md:text-4xl">Favorites</h1>

      {favorites.length === 0 ? (
        <EmptyState
          title="Data Empty"
          description="You don't have a favorite movie yet"
          actionLabel="Explore Movie"
          actionTo="/"
        />
      ) : (
        <div className="max-w-4xl">
          {favorites.map((movie) => (
            <MovieListItem
              key={movie.id}
              movie={movie}
              action={<FavoriteButton movie={movie} compact />}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
}
