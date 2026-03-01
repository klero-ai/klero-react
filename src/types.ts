export interface KleroConfig {
  projectSlug: string;
  baseUrl?: string;
  customerToken?: string;
  loginUrl?: string;
}

export type WidgetPosition = 'bottom-right' | 'bottom-left';
export type WidgetTab = 'feedback' | 'roadmap' | 'changelog';

export interface KleroWidgetConfig {
  position?: WidgetPosition;
  tabs?: WidgetTab[];
  defaultTab?: WidgetTab;
}

export interface KleroSurveyCompletedEvent {
  surveyUlid: string;
  responseUlid: string;
  answers: Record<string, unknown>;
}

export interface KleroSurveyClosedEvent {
  surveyUlid: string;
  completed: boolean;
}

export interface KleroSurveyErrorEvent {
  surveyUlid: string;
  error: string;
}

export type KleroEventMap = {
  'klero:survey:completed': KleroSurveyCompletedEvent;
  'klero:survey:closed': KleroSurveyClosedEvent;
  'klero:survey:error': KleroSurveyErrorEvent;
  'klero:widget:opened': undefined;
  'klero:widget:closed': undefined;
};

export type KleroEventType = keyof KleroEventMap;

// Augment window for type safety
declare global {
  interface Window {
    Klero?: {
      initialized: boolean;
      scan: () => void;
      openSurvey: (surveyUlid?: string) => void;
      postMessage: (event: string, data?: unknown) => void;
      push: (config: { type: string; config: Record<string, unknown> }) => void;
    };
    KleroWidget?: {
      open: () => void;
      close: () => void;
      destroy: () => void;
    };
    KleroSurvey?: {
      open: (surveyUlid?: string) => void;
      close: () => void;
      destroy: () => void;
    };
  }
}
