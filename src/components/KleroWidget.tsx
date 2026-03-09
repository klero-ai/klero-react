import { useEffect } from 'react';
import { useKleroConfig } from '../KleroProvider';
import type { KleroConfig } from '../types';

export type KleroWidgetProps = Partial<KleroConfig>

export function KleroWidget({ projectSlug, baseUrl, customerToken, loginUrl }: KleroWidgetProps) {
  const config = useKleroConfig({ projectSlug, baseUrl, customerToken, loginUrl });

  useEffect(() => {
    if (!config.loaded) return;

    const el = document.createElement('klero-widget');
    el.setAttribute(
      'data-config',
      JSON.stringify({
        projectId: config.projectSlug,
        baseUrl: config.baseUrl,
        customerToken: config.customerToken,
        loginUrl: config.loginUrl,
      }),
    );
    document.body.appendChild(el);
    return () => {
      window.KleroWidget?.destroy();
      el.remove();
    };
  }, [config.loaded, config.projectSlug, config.baseUrl, config.customerToken, config.loginUrl]);

  // Widget renders to body — no visible DOM here
  return null;
}
