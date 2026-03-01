import { useEffect } from 'react';
import type { KleroEventMap, KleroEventType } from './types';

type KleroEventCallbacks = {
  [K in KleroEventType]?: (data: KleroEventMap[K]) => void;
};

export function useKleroEvents(callbacks: KleroEventCallbacks): void {
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== 'object' || !event.data.type) {
        return;
      }

      const { type, data } = event.data as { type: string; data?: unknown };
      const cb = callbacks[type as KleroEventType];

      if (cb) {
        (cb as (data: unknown) => void)(data);
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [callbacks]);
}
