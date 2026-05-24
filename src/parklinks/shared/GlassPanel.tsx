import type { ReactNode, CSSProperties } from 'react';

type GlassPanelProps = {
  children: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'article' | 'section' | 'aside';
};

export function GlassPanel({
  children,
  tone = 'light',
  className = '',
  style,
  as: Tag = 'div',
}: GlassPanelProps) {
  const cls = tone === 'light' ? 'pl-glass' : 'pl-glass-dark';
  return (
    <Tag className={`${cls} ${className}`} style={style}>
      {children}
    </Tag>
  );
}
