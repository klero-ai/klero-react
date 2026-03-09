import { type HTMLAttributes } from 'react';
import { useKleroConfig } from '../KleroProvider';
import { useKleroEmbed } from '../useKleroEmbed';
import type { KleroConfig } from '../types';

export interface KleroChangelogProps extends HTMLAttributes<HTMLDivElement>, Partial<KleroConfig> {}

export function KleroChangelog({ projectSlug, baseUrl, customerToken, loginUrl, ...divProps }: KleroChangelogProps) {
  const config = useKleroConfig({ projectSlug, baseUrl, customerToken, loginUrl });
  const containerRef = useKleroEmbed('klero-changelog', config);

  return <div ref={containerRef} {...divProps} />;
}