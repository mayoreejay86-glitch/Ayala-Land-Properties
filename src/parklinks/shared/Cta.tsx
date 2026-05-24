import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

type CtaProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  showArrow?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
};

export function Cta({
  href,
  onClick,
  children,
  variant = 'primary',
  showArrow = true,
  type = 'button',
  disabled,
  className = '',
}: CtaProps) {
  const cls =
    variant === 'primary' ? 'pl-btn-primary' : 'pl-btn-ghost';
  const content = (
    <>
      <span>{children}</span>
      {showArrow && <ArrowRight size={14} strokeWidth={1.5} />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${cls} ${className}`} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${cls} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {content}
    </button>
  );
}
