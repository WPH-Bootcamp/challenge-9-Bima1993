import { motion } from 'framer-motion';

interface LoadingStateProps {
  label?: string;
}

export function LoadingState({ label = 'Loading movies' }: LoadingStateProps) {
  return (
    <div className="grid min-h-[420px] place-items-center">
      <div className="grid justify-items-center gap-5">
        <motion.div
          className="h-14 w-14 rounded-full border-4 border-white/10 border-t-[#bd1d0d]"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, ease: 'linear', repeat: Infinity }}
        />
        <p className="text-sm font-semibold text-white/50">{label}</p>
      </div>
    </div>
  );
}
