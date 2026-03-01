import { useCallback } from 'react';
import { useKleroContext } from '../KleroProvider';

export function useKleroWidget() {
  const { loaded } = useKleroContext();

  const open = useCallback(() => {
    if (!loaded) {
      console.warn('Klero script not loaded yet');
      return;
    }
    // Dispatch the custom event directly — the widget embed listens for this
    // even if window.KleroWidget is not yet available (async bundle loading)
    window.dispatchEvent(new CustomEvent('klero-widget-open'));
  }, [loaded]);

  const close = useCallback(() => {
    window.dispatchEvent(new CustomEvent('klero-widget-close'));
  }, []);

  return { open, close };
}
