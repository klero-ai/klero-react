import { useEffect } from 'react';
import { useKleroContext } from '../KleroProvider';
import type { WidgetPosition, WidgetTab } from '../types';

export interface KleroWidgetProps {
  position?: WidgetPosition;
  tabs?: WidgetTab[];
  defaultTab?: WidgetTab;
}

export function KleroWidget({ position = 'bottom-right', tabs, defaultTab }: KleroWidgetProps) {
  const { loaded, projectSlug, baseUrl, customerToken, loginUrl } = useKleroContext();

  useEffect(() => {
    if (!loaded) return;

    // Widget is a singleton — append to body
    const el = document.createElement('klero-widget');
    el.setAttribute(
      'data-config',
      JSON.stringify({
        projectId: projectSlug,
        baseUrl,
        customerToken,
        loginUrl,
        position,
        tabs,
        defaultTab,
      }),
    );
    document.body.appendChild(el);
    return () => {
      window.KleroWidget?.destroy();
      el.remove();
    };
  }, [loaded, projectSlug, baseUrl, customerToken, loginUrl, position, tabs, defaultTab]);

  // Widget renders to body via portal — no visible DOM here
  return null;
}
