import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useToastStore } from '@/store/toastStore';

export function AppToast() {
  const message = useToastStore((state) => state.message);
  const isVisible = useToastStore((state) => state.isVisible);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="fixed left-1/2 top-[96px] z-[100] flex h-[50px] w-[min(530px,calc(100vw-32px))] items-center justify-center gap-3 rounded-[10px] border border-white/10 bg-[radial-gradient(circle_at_65%_50%,rgba(125,36,30,0.26),rgba(134,130,128,0.48)_52%,rgba(134,130,128,0.38))] px-6 text-white shadow-xl shadow-black/25 backdrop-blur-2xl"
          initial={{ opacity: 0, y: -18, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -18, x: '-50%' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="h-5 w-5 fill-white text-[#7f766f]" aria-hidden="true" />
          <span className="text-sm font-semibold tracking-wide md:text-base">{message}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
