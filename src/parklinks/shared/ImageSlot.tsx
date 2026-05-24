import { ImageIcon } from 'lucide-react';

type ImageSlotProps = {
  src?: string;
  alt?: string;
  /** Aspect ratio expressed as "w / h" — e.g. "16 / 9", "4 / 5". */
  ratio?: string;
  /** Label shown only when no image is supplied (placeholder mode). */
  placeholderLabel?: string;
  className?: string;
  rounded?: boolean;
};

/**
 * Image slot that:
 *  - renders the image if `src` is provided,
 *  - otherwise renders an elegant labeled placeholder for future renders.
 */
export function ImageSlot({
  src,
  alt = '',
  ratio = '16 / 10',
  placeholderLabel = 'Render placeholder',
  className = '',
  rounded = false,
}: ImageSlotProps) {
  const radius = rounded ? 'rounded-2xl' : '';
  if (src) {
    return (
      <figure
        className={`relative overflow-hidden ${radius} ${className}`}
        style={{ aspectRatio: ratio }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </figure>
    );
  }
  return (
    <div
      className={`relative overflow-hidden ${radius} ${className} flex items-center justify-center pl-glass`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={placeholderLabel}
    >
      <div className="flex flex-col items-center gap-3 text-ivory/40">
        <ImageIcon size={28} strokeWidth={1} />
        <span className="text-[0.65rem] tracking-[0.3em] uppercase">{placeholderLabel}</span>
      </div>
    </div>
  );
}
