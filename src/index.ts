// Provider
export { KleroProvider, useKleroContext } from './KleroProvider';
export type { KleroProviderProps } from './KleroProvider';

// Components
export { KleroFeedback } from './components/KleroFeedback';
export { KleroRoadmap } from './components/KleroRoadmap';
export { KleroChangelog } from './components/KleroChangelog';
export { KleroWidget } from './components/KleroWidget';
export { KleroSurvey } from './components/KleroSurvey';

// Hooks
export { useKleroSurvey } from './hooks/useKleroSurvey';
export { useKleroWidget } from './hooks/useKleroWidget';
export { useKleroEvents } from './useKleroEvents';
export { useKleroScript } from './useKleroScript';

// Types
export type {
  KleroConfig,
  WidgetPosition,
  WidgetTab,
  KleroWidgetConfig,
  KleroSurveyCompletedEvent,
  KleroSurveyClosedEvent,
  KleroSurveyErrorEvent,
  KleroEventMap,
  KleroEventType,
} from './types';
