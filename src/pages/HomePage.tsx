import { motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import arrowLogo from '@/assets/Arrow Logo.png';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { MoviePosterCard } from '@/components/movie/MoviePosterCard';
import { MovieSection } from '@/components/movie/MovieSection';
import { PlayIcon } from '@/components/movie/PlayIcon';
import { Button } from '@/components/ui/button';
import { useNowPlayingMovies, usePopularMovies } from '@/hooks/useMovies';
import { IMAGE_SIZES } from '@/lib/constants';
import { cn, getImageUrl } from '@/lib/utils';

const INITIAL_RELEASE_COUNT = 10;
const RELEASE_LOAD_MORE_COUNT = 10;
const MAX_RELEASE_LOAD_MORE_CLICKS = 3;
const TRENDING_MOVIE_COUNT = 14;

export function HomePage() {
  const [releaseLoadMoreClicks, setReleaseLoadMoreClicks] = useState(0);
  const trendingRef = useRef<HTMLDivElement | null>(null);
  const popularQuery = usePopularMovies();
  const nowPlayingFirstPageQuery = useNowPlayingMovies(1);
  const nowPlayingSecondPageQuery = useNowPlayingMovies(2);
  const nowPlayingThirdPageQuery = useNowPlayingMovies(3);

  const popularMovies = popularQuery.data?.results ?? [];
  const trendingMovies = popularMovies.slice(0, TRENDING_MOVIE_COUNT);
  const trendingMovieIds = useMemo(
    () => new Set(trendingMovies.map((movie) => movie.id)),
    [trendingMovies]
  );
  const nowPlayingFirstPageMovies = nowPlayingFirstPageQuery.data?.results;
  const nowPlayingSecondPageMovies = nowPlayingSecondPageQuery.data?.results;
  const nowPlayingThirdPageMovies = nowPlayingThirdPageQuery.data?.results;
  const nowPlayingMovies = nowPlayingFirstPageMovies ?? [];
  const newReleaseMovies = useMemo(() => {
    const movieMap = new Map<number, NonNullable<typeof nowPlayingFirstPageMovies>[number]>();

    [
      ...(nowPlayingFirstPageMovies ?? []),
      ...(nowPlayingSecondPageMovies ?? []),
      ...(nowPlayingThirdPageMovies ?? []),
    ].forEach((movie) => {
      if (!trendingMovieIds.has(movie.id)) {
        movieMap.set(movie.id, movie);
      }
    });

    return Array.from(movieMap.values());
  }, [
    nowPlayingFirstPageMovies,
    nowPlayingSecondPageMovies,
    nowPlayingThirdPageMovies,
    trendingMovieIds,
  ]);
  const heroMovie = popularMovies[0] ?? nowPlayingMovies[0];
  const isLoading = popularQuery.isLoading || nowPlayingFirstPageQuery.isLoading;
  const hasError = popularQuery.isError || nowPlayingFirstPageQuery.isError;
  const visibleReleaseCount =
    INITIAL_RELEASE_COUNT + releaseLoadMoreClicks * RELEASE_LOAD_MORE_COUNT;
  const visibleReleases = newReleaseMovies.slice(0, visibleReleaseCount);
  const canLoadMore =
    releaseLoadMoreClicks < MAX_RELEASE_LOAD_MORE_CLICKS &&
    visibleReleaseCount < newReleaseMovies.length;

  const scrollTrending = (direction: 'left' | 'right') => {
    const container = trendingRef.current;

    if (!container) {
      return;
    }

    container.scrollBy({
      left: direction === 'right' ? container.clientWidth * 0.8 : -container.clientWidth * 0.8,
      behavior: 'smooth',
    });
  };

  if (isLoading) {
    return (
      <section className="pt-24">
        <LoadingState />
      </section>
    );
  }

  if (hasError || !heroMovie) {
    return (
      <section className="pt-24">
        <ErrorState
          onRetry={() =>
            void Promise.all([
              popularQuery.refetch(),
              nowPlayingFirstPageQuery.refetch(),
              nowPlayingSecondPageQuery.refetch(),
              nowPlayingThirdPageQuery.refetch(),
            ])
          }
        />
      </section>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      <section
        className="relative min-h-[650px] overflow-hidden bg-black pt-28 md:min-h-[680px]"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.92) 0%, rgba(0,0,0,.6) 42%, rgba(0,0,0,.2) 100%), linear-gradient(0deg, #000 0%, rgba(0,0,0,.18) 36%, rgba(0,0,0,.1) 100%), url(${getImageUrl(
            heroMovie.backdrop_path,
            IMAGE_SIZES.backdrop.original
          )})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <div className="mx-auto flex min-h-[520px] w-full max-w-6xl items-center px-6 md:px-10">
          <div className="max-w-xl">
            <motion.h1
              className="text-balance text-4xl font-extrabold leading-tight md:text-5xl"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              {heroMovie.title}
            </motion.h1>
            <motion.p
              className="mt-5 line-clamp-3 text-sm font-medium leading-7 text-white/58 md:text-base"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              {heroMovie.overview}
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
            >
              <Button asChild className="w-full sm:w-auto sm:min-w-[190px]">
                <Link to={`/movie/${heroMovie.id}`}>
                  Watch Trailer
                  <PlayIcon />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full sm:w-auto sm:min-w-[150px]">
                <Link to={`/movie/${heroMovie.id}`}>See Detail</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl space-y-20 px-6 pb-24 md:px-10">
        <MovieSection title="Trending Now" className="-mt-16 relative z-10 md:-mt-28">
          <div className="relative">
            <button
              className="absolute left-1 top-[38%] z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              type="button"
              aria-label="Scroll trending movies left"
              onClick={() => scrollTrending('left')}
            >
              <img className="h-11 w-11 rotate-180" src={arrowLogo} alt="" aria-hidden="true" />
            </button>
            <div
              ref={trendingRef}
              className="no-scrollbar flex snap-x gap-5 overflow-x-auto pb-2 pl-1 pr-16"
            >
            {trendingMovies.map((movie, index) => (
              <MoviePosterCard key={movie.id} movie={movie} rank={index + 1} />
            ))}
            </div>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black via-black/55 to-transparent backdrop-blur-[1.5px]"
              aria-hidden="true"
            />
            <button
              className="absolute right-1 top-[38%] z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              type="button"
              aria-label="Scroll trending movies right"
              onClick={() => scrollTrending('right')}
            >
              <img className="h-11 w-11" src={arrowLogo} alt="" aria-hidden="true" />
            </button>
          </div>
        </MovieSection>

        <MovieSection title="New Release">
          <div className="relative">
            <div
              className={cn(
                'grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
                canLoadMore && 'pb-24'
              )}
            >
              {visibleReleases.map((movie) => (
                <MoviePosterCard key={movie.id} movie={movie} compact />
              ))}
            </div>
            {canLoadMore ? (
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent via-black/55 to-black backdrop-blur-[1.5px]"
                aria-hidden="true"
              />
            ) : null}
          </div>
          {canLoadMore ? (
            <div className="-mt-20 flex justify-center">
              <Button
                type="button"
                variant="secondary"
                className="relative z-10 min-w-40"
                onClick={() => setReleaseLoadMoreClicks((count) => count + 1)}
              >
                Load More
              </Button>
            </div>
          ) : null}
        </MovieSection>
      </div>
    </motion.div>
  );
}
