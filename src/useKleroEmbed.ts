import { useRef, useEffect } from 'react';
import type { KleroContextValue } from './KleroProvider';

export function useKleroEmbed(
  tagName: string,
  config: KleroContextValue,
  extraConfig: Record<string, unknown> = {},
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const extraJson = JSON.stringify(extraConfig);

  useEffect(() => {
    if (!config.loaded || !containerRef.current) return;

    const el = document.createElement(tagName);
    el.setAttribute(
      'data-config',
      JSON.stringify({
        projectId: config.projectSlug,
        baseUrl: config.baseUrl,
        customerToken: config.customerToken,
        loginUrl: config.loginUrl,
        ...JSON.parse(extraJson),
      }),
    );
    containerRef.current.appendChild(el);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [config.loaded, config.projectSlug, config.baseUrl, config.customerToken, config.loginUrl, tagName, extraJson]);

  return containerRef;
}
