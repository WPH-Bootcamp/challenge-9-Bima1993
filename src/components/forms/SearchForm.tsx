import { zodResolver } from '@hookform/resolvers/zod';
import { Search, X } from 'lucide-react';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .min(2, 'Use at least 2 characters')
    .max(60, 'Search is too long'),
});

type SearchFormValues = z.infer<typeof searchSchema>;

interface SearchFormProps {
  className?: string;
  inputClassName?: string;
  initialQuery?: string;
  autoFocus?: boolean;
}

export function SearchForm({
  className,
  inputClassName,
  initialQuery = '',
  autoFocus = false,
}: SearchFormProps) {
  const navigate = useNavigate();
  const {
    register,
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: initialQuery,
    },
  });
  const query = useWatch({ control, name: 'query' });

  useEffect(() => {
    reset({ query: initialQuery });
  }, [initialQuery, reset]);

  const onSubmit = ({ query: submittedQuery }: SearchFormValues) => {
    navigate(`/search?query=${encodeURIComponent(submittedQuery.trim())}`);
  };

  return (
    <form className={cn('relative', className)} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45"
        aria-hidden="true"
      />
      <Input
        {...register('query')}
        autoComplete="off"
        autoFocus={autoFocus}
        className={cn('pr-10 pl-11', inputClassName)}
        placeholder="Search Movie"
        aria-label="Search Movie"
      />
      {query ? (
        <button
          className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/50 transition hover:text-white"
          type="button"
          aria-label="Clear search"
          onClick={() => setValue('query', '')}
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      ) : null}
      {errors.query ? (
        <p className="absolute left-0 top-full mt-2 text-xs font-medium text-red-300">
          {errors.query.message}
        </p>
      ) : null}
    </form>
  );
}
