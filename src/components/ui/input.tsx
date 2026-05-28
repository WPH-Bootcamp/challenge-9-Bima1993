import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'h-11 w-full rounded-xl border border-white/10 bg-[#060a10]/90 px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/25 focus:bg-[#090e16]',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';
