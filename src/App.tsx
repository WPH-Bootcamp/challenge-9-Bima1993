import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoadingState } from '@/components/common/LoadingState';
import { AppLayout } from '@/components/layout/AppLayout';

const FavoritesPage = lazy(() =>
  import('@/pages/FavoritesPage').then(({ FavoritesPage }) => ({ default: FavoritesPage }))
);
const HomePage = lazy(() =>
  import('@/pages/HomePage').then(({ HomePage }) => ({ default: HomePage }))
);
const MovieDetailPage = lazy(() =>
  import('@/pages/MovieDetailPage').then(({ MovieDetailPage }) => ({ default: MovieDetailPage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then(({ NotFoundPage }) => ({ default: NotFoundPage }))
);
const SearchPage = lazy(() =>
  import('@/pages/SearchPage').then(({ SearchPage }) => ({ default: SearchPage }))
);

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Suspense
          fallback={
            <section className="pt-24">
              <LoadingState />
            </section>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/movie/:movieId" element={<MovieDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
