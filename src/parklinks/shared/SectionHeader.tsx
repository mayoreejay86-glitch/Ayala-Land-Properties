import { Reveal } from './Reveal';

type SectionHeaderProps = {
  eyebrow: string;
  /** HTML allowed: wrap accent words in <em>...</em> for gold italic. */
  title: string;
  body?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
};

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = 'left',
  tone = 'dark',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start';
  const bodyTone =
    tone === 'light'
      ? 'text-forest-deep/70'
      : 'pl-section-body';
  const titleTone = tone === 'light' ? 'text-forest-deep' : '';

  return (
    <Reveal className={`flex flex-col ${alignClass} max-w-3xl gap-5`}>
      <span className="pl-eyebrow">{eyebrow}</span>
      <h2
        className={`pl-section-title ${titleTone}`}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {body && <p className={bodyTone}>{body}</p>}
    </Reveal>
  );
}
