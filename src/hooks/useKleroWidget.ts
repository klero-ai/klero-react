import { useCallback, useContext } from 'react';
import { KleroContext } from '../KleroProvider';

export function useKleroWidget() {
  const ctx = useContext(KleroContext);

  const open = useCallback(() => {
    if (ctx && !ctx.loaded) {
      console.warn('Klero script not loaded yet');
      return;
    }
    window.dispatchEvent(new CustomEvent('klero-widget-open'));
  }, [ctx]);

  const close = useCallback(() => {
    window.dispatchEvent(new CustomEvent('klero-widget-close'));
  }, []);

  return { open, close };
}