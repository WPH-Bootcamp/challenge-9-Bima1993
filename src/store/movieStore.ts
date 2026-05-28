import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '@/lib/constants';
import type { FavoriteMovie, Movie, MovieDetails } from '@/types/movie';

type StorableMovie = FavoriteMovie | Movie | MovieDetails;

interface MovieStore {
  favorites: FavoriteMovie[];
  watchlist: FavoriteMovie[];
  selectedMovie: MovieDetails | null;
  addToFavorites: (movie: StorableMovie) => void;
  removeFromFavorites: (movieId: number) => void;
  toggleFavorite: (movie: StorableMovie) => void;
  isFavorite: (movieId: number) => boolean;
  addToWatchlist: (movie: StorableMovie) => void;
  removeFromWatchlist: (movieId: number) => void;
  toggleWatchlist: (movie: StorableMovie) => void;
  isInWatchlist: (movieId: number) => boolean;
  setSelectedMovie: (movie: MovieDetails | null) => void;
}

function toFavoriteMovie(movie: StorableMovie): FavoriteMovie {
  return {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    overview: movie.overview,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
  };
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      watchlist: [],
      selectedMovie: null,

      addToFavorites: (movie) => {
        if (get().isFavorite(movie.id)) {
          return;
        }

        set((state) => ({
          favorites: [...state.favorites, toFavoriteMovie(movie)],
        }));
      },

      removeFromFavorites: (movieId) => {
        set((state) => ({
          favorites: state.favorites.filter((movie) => movie.id !== movieId),
        }));
      },

      toggleFavorite: (movie) => {
        if (get().isFavorite(movie.id)) {
          get().removeFromFavorites(movie.id);
          return;
        }

        get().addToFavorites(movie);
      },

      isFavorite: (movieId) => get().favorites.some((movie) => movie.id === movieId),

      addToWatchlist: (movie) => {
        if (get().isInWatchlist(movie.id)) {
          return;
        }

        set((state) => ({
          watchlist: [...state.watchlist, toFavoriteMovie(movie)],
        }));
      },

      removeFromWatchlist: (movieId) => {
        set((state) => ({
          watchlist: state.watchlist.filter((movie) => movie.id !== movieId),
        }));
      },

      toggleWatchlist: (movie) => {
        if (get().isInWatchlist(movie.id)) {
          get().removeFromWatchlist(movie.id);
          return;
        }

        get().addToWatchlist(movie);
      },

      isInWatchlist: (movieId) => get().watchlist.some((movie) => movie.id === movieId),

      setSelectedMovie: (movie) => {
        set({ selectedMovie: movie });
      },
    }),
    {
      name: STORAGE_KEYS.movieStore,
      partialize: (state) => ({
        favorites: state.favorites,
        watchlist: state.watchlist,
      }),
    }
  )
);
