import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGE_SIZES } from '@/lib/constants';
import { formatRating, getImageUrl } from '@/lib/utils';
import type { Movie } from '@/types/movie';

interface MoviePosterCardProps {
  movie: Movie;
  rank?: number;
  compact?: boolean;
}

export function MoviePosterCard({ movie, rank, compact = false }: MoviePosterCardProps) {
  return (
    <motion.article
      className={compact ? 'w-full' : 'w-[150px] shrink-0 md:w-[170px]'}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Link to={`/movie/${movie.id}`} className="group block">
        <div className="relative overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/5">
          <img
            className="aspect-[2/3] w-full object-cover transition duration-300 group-hover:scale-105"
            src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.medium)}
            alt={movie.title}
            loading="lazy"
          />
          {rank ? (
            <span className="absolute left-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-white/75 text-xs font-extrabold text-black">
              {rank}
            </span>
          ) : null}
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="truncate text-sm font-bold text-white">{movie.title}</h3>
          <p className="inline-flex items-center gap-1 text-xs font-semibold text-white/75">
            <Star className="h-3.5 w-3.5 fill-[#ffc400] text-[#ffc400]" aria-hidden="true" />
            {formatRating(movie.vote_average)}/10
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
