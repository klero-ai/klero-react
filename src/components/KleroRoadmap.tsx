import { type HTMLAttributes } from 'react';
import { useKleroConfig } from '../KleroProvider';
import { useKleroEmbed } from '../useKleroEmbed';
import type { KleroConfig } from '../types';

export interface KleroRoadmapProps extends HTMLAttributes<HTMLDivElement>, Partial<KleroConfig> {
  roadmapSlug?: string;
}

export function KleroRoadmap({ projectSlug, baseUrl, customerToken, loginUrl, roadmapSlug, ...divProps }: KleroRoadmapProps) {
  const config = useKleroConfig({ projectSlug, baseUrl, customerToken, loginUrl });
  const containerRef = useKleroEmbed('klero-roadmap', config, roadmapSlug ? { roadmapSlug } : undefined);

  return <div ref={containerRef} {...divProps} />;
}