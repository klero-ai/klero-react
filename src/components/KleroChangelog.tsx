import { useRef, useEffect, type HTMLAttributes } from 'react';
import { useKleroContext } from '../KleroProvider';

export interface KleroChangelogProps extends HTMLAttributes<HTMLDivElement> {}

export function KleroChangelog({ ...divProps }: KleroChangelogProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { loaded, projectSlug, baseUrl, customerToken, loginUrl } = useKleroContext();

  useEffect(() => {
    if (!loaded || !containerRef.current) return;

    const el = document.createElement('klero-changelog');
    el.setAttribute(
      'data-config',
      JSON.stringify({
        projectId: projectSlug,
        baseUrl,
        customerToken,
        loginUrl,
      }),
    );
    containerRef.current.appendChild(el);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [loaded, projectSlug, baseUrl, customerToken, loginUrl]);

  return <div ref={containerRef} {...divProps} />;
}
