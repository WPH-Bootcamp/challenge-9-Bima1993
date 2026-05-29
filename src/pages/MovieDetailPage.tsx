import { motion } from 'framer-motion';
import { CalendarDays, ShieldCheck, Star, Tags } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { FavoriteButton } from '@/components/movie/FavoriteButton';
import { StatCard } from '@/components/movie/StatCard';
import { TrailerDialog } from '@/components/movie/TrailerDialog';
import { useMovieCredits, useMovieDetails, useMovieVideos } from '@/hooks/useMovies';
import { IMAGE_SIZES } from '@/lib/constants';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { formatDate, formatRating, formatRuntime, getImageUrl } from '@/utils/movie';

export function MovieDetailPage() {
  const params = useParams();
  const movieId = Number(params.movieId);
  const detailsQuery = useMovieDetails(movieId);
  const creditsQuery = useMovieCredits(movieId);
  const videosQuery = useMovieVideos(movieId);

  if (!Number.isFinite(movieId)) {
    return <NotFoundPage />;
  }

  if (detailsQuery.isLoading) {
    return (
      <section className="pt-24">
        <LoadingState label="Loading movie detail" />
      </section>
    );
  }

  if (detailsQuery.isError || !detailsQuery.data) {
    return (
      <section className="pt-24">
        <ErrorState onRetry={() => void detailsQuery.refetch()} />
      </section>
    );
  }

  const movie = detailsQuery.data;
  const videos = videosQuery.data?.results ?? [];
  const cast = creditsQuery.data?.cast.slice(0, 6) ?? [];
  const firstGenre = movie.genres[0]?.name ?? 'Movie';
  const ageLimit = movie.adult ? '18+' : '13';

  return (
    <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      <section
        className="relative min-h-[530px] bg-black pt-28 md:min-h-[610px]"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.92) 0%, rgba(0,0,0,.72) 45%, rgba(0,0,0,.25) 100%), linear-gradient(0deg, #000 0%, rgba(0,0,0,.05) 58%, rgba(0,0,0,.1) 100%), url(${getImageUrl(
            movie.backdrop_path,
            IMAGE_SIZES.backdrop.original
          )})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <div className="mx-auto grid w-full max-w-6xl gap-7 px-6 pb-14 md:grid-cols-[180px_1fr] md:px-10 md:pt-28">
          <img
            className="w-36 rounded-lg object-cover ring-2 ring-white/70 md:w-full"
            src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.medium)}
            alt={movie.title}
          />

          <div className="min-w-0 self-end">
            <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-white/55">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {formatDate(movie.release_date)}
            </p>
            <h1 className="text-balance text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
              {movie.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <TrailerDialog title={movie.title} videos={videos} />
              <FavoriteButton movie={movie} />
            </div>
            <div className="mt-6 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
              <StatCard icon={Star} label="Rating" value={`${formatRating(movie.vote_average)}/10`} />
              <StatCard icon={Tags} label="Genre" value={firstGenre} />
              <StatCard icon={ShieldCheck} label="Age Limit" value={ageLimit} />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl space-y-14 px-6 pb-24 md:px-10">
        <section>
          <h2 className="mb-4 text-xl font-extrabold">Overview</h2>
          <p className="max-w-5xl text-sm leading-7 text-white/55">
            {movie.overview || 'No overview available.'}
          </p>
          <p className="mt-3 text-sm font-semibold text-white/35">{formatRuntime(movie.runtime)}</p>
        </section>

        <section>
          <h2 className="mb-5 text-xl font-extrabold">Cast & Crew</h2>
          {creditsQuery.isLoading ? (
            <p className="text-sm text-white/40">Loading cast...</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cast.map((person) => (
                <div key={`${person.id}-${person.order}`} className="flex items-center gap-4">
                  <img
                    className="h-14 w-14 rounded-md object-cover ring-1 ring-white/10"
                    src={getImageUrl(person.profile_path, IMAGE_SIZES.profile.medium)}
                    alt={person.name}
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-extrabold">{person.name}</h3>
                    <p className="truncate text-xs font-medium text-white/45">{person.character}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </motion.article>
  );
}
