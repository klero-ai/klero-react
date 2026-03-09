import { type HTMLAttributes } from 'react';
import { useKleroConfig } from '../KleroProvider';
import { useKleroEmbed } from '../useKleroEmbed';
import type { KleroConfig } from '../types';

export interface KleroFeedbackProps extends HTMLAttributes<HTMLDivElement>, Partial<KleroConfig> {}

export function KleroFeedback({ projectSlug, baseUrl, customerToken, loginUrl, ...divProps }: KleroFeedbackProps) {
  const config = useKleroConfig({ projectSlug, baseUrl, customerToken, loginUrl });
  const containerRef = useKleroEmbed('klero-feedback', config);

  return <div ref={containerRef} {...divProps} />;
}