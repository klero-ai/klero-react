import { useCallback } from 'react';
import { useKleroContext } from '../KleroProvider';

export function useKleroSurvey() {
  const { loaded } = useKleroContext();

  const open = useCallback(
    (surveyUlid: string) => {
      if (!loaded) {
        console.warn('Klero script not loaded yet');
        return;
      }
      window.Klero?.openSurvey(surveyUlid);
    },
    [loaded],
  );

  const close = useCallback(() => {
    window.KleroSurvey?.close();
  }, []);

  return { open, close };
}
