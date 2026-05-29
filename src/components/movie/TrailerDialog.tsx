import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { MovieVideo } from '@/types/movie';
import { PlayIcon } from '@/components/movie/PlayIcon';

interface TrailerDialogProps {
  title: string;
  videos: MovieVideo[];
}

export function TrailerDialog({ title, videos }: TrailerDialogProps) {
  const trailer =
    videos.find(
      (video) =>
        video.site === 'YouTube' &&
        video.official &&
        video.type.toLowerCase().includes('trailer')
    ) ??
    videos.find((video) => video.site === 'YouTube' && video.type.toLowerCase().includes('trailer')) ??
    videos.find((video) => video.site === 'YouTube');

  if (!trailer) {
    return null;
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>
          Watch Trailer
          <PlayIcon />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <Dialog.Title className="text-sm font-bold text-white md:text-base">{title}</Dialog.Title>
            <Dialog.Description className="sr-only">
              Trailer video for {title}
            </Dialog.Description>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close trailer">
                <X className="h-5 w-5" aria-hidden="true" />
              </Button>
            </Dialog.Close>
          </div>
          <iframe
            className="aspect-video w-full"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={`${title} trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
