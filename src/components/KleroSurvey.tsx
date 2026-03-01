import { useEffect } from 'react';
import { useKleroContext } from '../KleroProvider';
import { useKleroEvents } from '../useKleroEvents';
import type { KleroSurveyCompletedEvent, KleroSurveyClosedEvent, KleroSurveyErrorEvent } from '../types';

export interface KleroSurveyProps {
  surveyUlid: string;
  onComplete?: (data: KleroSurveyCompletedEvent) => void;
  onClose?: (data: KleroSurveyClosedEvent) => void;
  onError?: (data: KleroSurveyErrorEvent) => void;
}

export function KleroSurvey({ surveyUlid, onComplete, onClose, onError }: KleroSurveyProps) {
  const { loaded, projectSlug, baseUrl, customerToken, loginUrl } = useKleroContext();

  useKleroEvents({
    'klero:survey:completed': onComplete,
    'klero:survey:closed': onClose,
    'klero:survey:error': onError,
  });

  useEffect(() => {
    if (!loaded) return;

    const el = document.createElement('klero-survey');
    el.setAttribute(
      'data-config',
      JSON.stringify({
        projectId: projectSlug,
        baseUrl,
        customerToken,
        loginUrl,
        surveyUlid,
      }),
    );
    document.body.appendChild(el);
    return () => {
      window.KleroSurvey?.destroy();
      el.remove();
    };
  }, [loaded, projectSlug, baseUrl, customerToken, loginUrl, surveyUlid]);

  return null;
}
