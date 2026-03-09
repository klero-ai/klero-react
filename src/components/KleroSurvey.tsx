import { useEffect } from 'react';
import { useKleroConfig } from '../KleroProvider';
import { useKleroEvents } from '../useKleroEvents';
import type { KleroConfig, KleroSurveyCompletedEvent, KleroSurveyClosedEvent, KleroSurveyErrorEvent } from '../types';

export interface KleroSurveyProps extends Partial<KleroConfig> {
  surveyUlid: string;
  onComplete?: (data: KleroSurveyCompletedEvent) => void;
  onClose?: (data: KleroSurveyClosedEvent) => void;
  onError?: (data: KleroSurveyErrorEvent) => void;
}

export function KleroSurvey({ projectSlug, baseUrl, customerToken, loginUrl, surveyUlid, onComplete, onClose, onError }: KleroSurveyProps) {
  const config = useKleroConfig({ projectSlug, baseUrl, customerToken, loginUrl });

  useKleroEvents({
    'klero:survey:completed': onComplete,
    'klero:survey:closed': onClose,
    'klero:survey:error': onError,
  });

  useEffect(() => {
    if (!config.loaded) return;

    const el = document.createElement('klero-survey');
    el.setAttribute(
      'data-config',
      JSON.stringify({
        projectId: config.projectSlug,
        baseUrl: config.baseUrl,
        customerToken: config.customerToken,
        loginUrl: config.loginUrl,
        surveyUlid,
      }),
    );
    document.body.appendChild(el);
    return () => {
      window.KleroSurvey?.destroy();
      el.remove();
    };
  }, [config.loaded, config.projectSlug, config.baseUrl, config.customerToken, config.loginUrl, surveyUlid]);

  return null;
}