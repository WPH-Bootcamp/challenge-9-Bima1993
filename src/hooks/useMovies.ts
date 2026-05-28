import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { movieService } from '@/services/movieService';

export const usePopularMovies = (page: number = 1) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.popular(page),
    queryFn: () => movieService.getPopularMovies(page),
  });
};

export const useNowPlayingMovies = (page: number = 1) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.nowPlaying(page),
    queryFn: () => movieService.getNowPlayingMovies(page),
  });
};

export const useMovieDetails = (movieId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.details(movieId),
    queryFn: () => movieService.getMovieDetails(movieId),
    enabled: Number.isFinite(movieId),
  });
};

export const useMovieCredits = (movieId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.credits(movieId),
    queryFn: () => movieService.getMovieCredits(movieId),
    enabled: Number.isFinite(movieId),
  });
};

export const useMovieVideos = (movieId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.videos(movieId),
    queryFn: () => movieService.getMovieVideos(movieId),
    enabled: Number.isFinite(movieId),
  });
};

export const useSimilarMovies = (movieId: number, page: number = 1) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.similar(movieId, page),
    queryFn: () => movieService.getSimilarMovies(movieId, page),
    enabled: Number.isFinite(movieId),
  });
};

export const useSearchMovies = (query: string, page: number = 1) => {
  const normalizedQuery = query.trim();

  return useQuery({
    queryKey: QUERY_KEYS.movies.search(normalizedQuery, page),
    queryFn: () => movieService.searchMovies(normalizedQuery, page),
    enabled: normalizedQuery.length >= 2,
  });
};
