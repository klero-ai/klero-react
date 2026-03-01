import { useRef, useEffect, type HTMLAttributes } from 'react';
import { useKleroContext } from '../KleroProvider';

export interface KleroRoadmapProps extends HTMLAttributes<HTMLDivElement> {
  roadmapSlug?: string;
}

export function KleroRoadmap({ roadmapSlug, ...divProps }: KleroRoadmapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { loaded, projectSlug, baseUrl, customerToken, loginUrl } = useKleroContext();

  useEffect(() => {
    if (!loaded || !containerRef.current) return;

    const el = document.createElement('klero-roadmap');
    el.setAttribute(
      'data-config',
      JSON.stringify({
        projectId: projectSlug,
        baseUrl,
        customerToken,
        loginUrl,
        ...(roadmapSlug ? { roadmapSlug } : {}),
      }),
    );
    containerRef.current.appendChild(el);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [loaded, projectSlug, baseUrl, customerToken, loginUrl, roadmapSlug]);

  return <div ref={containerRef} {...divProps} />;
}
