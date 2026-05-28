import { Link } from 'react-router-dom';
import { EmptyState } from '@/components/common/EmptyState';

export function NotFoundPage() {
  return (
    <section className="min-h-[calc(100vh-96px)] pt-24">
      <EmptyState
        title="Data Not Found"
        description="Try other keywords"
        actionLabel="Explore Movie"
        actionTo="/"
        variant="not-found"
      />
      <Link to="/" className="sr-only">
        Back to home
      </Link>
    </section>
  );
}
