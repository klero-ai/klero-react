import { useCallback, useContext } from 'react';
import { KleroContext } from '../KleroProvider';

export function useKleroSurvey() {
  const ctx = useContext(KleroContext);

  const open = useCallback(
    (surveyUlid: string) => {
      if (ctx && !ctx.loaded) {
        console.warn('Klero script not loaded yet');
        return;
      }
      window.Klero?.openSurvey(surveyUlid);
    },
    [ctx],
  );

  const close = useCallback(() => {
    window.KleroSurvey?.close();
  }, []);

  return { open, close };
}