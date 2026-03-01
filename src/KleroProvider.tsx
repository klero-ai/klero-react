import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { KleroConfig } from './types';
import { useKleroScript } from './useKleroScript';

interface KleroContextValue extends KleroConfig {
  loaded: boolean;
  error: string | null;
}

const KleroContext = createContext<KleroContextValue | null>(null);

export function useKleroContext(): KleroContextValue {
  const ctx = useContext(KleroContext);
  if (!ctx) {
    throw new Error('useKleroContext must be used within a <KleroProvider>');
  }
  return ctx;
}

export interface KleroProviderProps extends KleroConfig {
  children: ReactNode;
}

export function KleroProvider({ children, ...config }: KleroProviderProps) {
  const baseUrl = config.baseUrl ?? `https://${config.projectSlug}.klero.ai`;
  const { loaded, error } = useKleroScript(baseUrl);

  const value = useMemo<KleroContextValue>(
    () => ({ ...config, baseUrl, loaded, error }),
    [config.projectSlug, config.customerToken, config.loginUrl, baseUrl, loaded, error],
  );

  return <KleroContext.Provider value={value}>{children}</KleroContext.Provider>;
}
