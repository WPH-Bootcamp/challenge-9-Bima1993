import api from '@/lib/axios';
import type {
  Credits,
  MovieDetails,
  MovieResponse,
  VideoResponse,
} from '@/types/movie';

const DEFAULT_PAGE = 1;

export const movieService = {
  async getPopularMovies(page: number = DEFAULT_PAGE): Promise<MovieResponse> {
    const { data } = await api.get<MovieResponse>('/movie/popular', {
      params: { page },
    });

    return data;
  },

  async getNowPlayingMovies(page: number = DEFAULT_PAGE): Promise<MovieResponse> {
    const { data } = await api.get<MovieResponse>('/movie/now_playing', {
      params: { page },
    });

    return data;
  },

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    const { data } = await api.get<MovieDetails>(`/movie/${movieId}`);

    return data;
  },

  async getMovieCredits(movieId: number): Promise<Credits> {
    const { data } = await api.get<Credits>(`/movie/${movieId}/credits`);

    return data;
  },

  async getMovieVideos(movieId: number): Promise<VideoResponse> {
    const { data } = await api.get<VideoResponse>(`/movie/${movieId}/videos`);

    return data;
  },

  async getSimilarMovies(movieId: number, page: number = DEFAULT_PAGE): Promise<MovieResponse> {
    const { data } = await api.get<MovieResponse>(`/movie/${movieId}/similar`, {
      params: { page },
    });

    return data;
  },

  async searchMovies(query: string, page: number = DEFAULT_PAGE): Promise<MovieResponse> {
    const { data } = await api.get<MovieResponse>('/search/movie', {
      params: {
        query,
        page,
        include_adult: false,
      },
    });

    return data;
  },
};
