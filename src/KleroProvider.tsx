import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { KleroConfig } from './types';
import { useKleroScript } from './useKleroScript';

export function useKleroConfig(props: Partial<KleroConfig> = {}): KleroContextValue {
  const ctx = useContext(KleroContext);

  const projectSlug = ctx?.projectSlug ?? props.projectSlug ?? '';
  const baseUrl = ctx?.baseUrl ?? props.baseUrl ?? `https://${projectSlug}.klero.ai`;
  const customerToken = ctx?.customerToken ?? props.customerToken;
  const loginUrl = ctx?.loginUrl ?? props.loginUrl;

  const { loaded: scriptLoaded, error: scriptError } = useKleroScript(baseUrl);

  return {
    projectSlug,
    baseUrl,
    customerToken,
    loginUrl,
    loaded: ctx ? ctx.loaded : scriptLoaded,
    error: ctx ? ctx.error : scriptError,
  };
}

export interface KleroContextValue extends KleroConfig {
  loaded: boolean;
  error: string | null;
}

export const KleroContext = createContext<KleroContextValue | null>(null);

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
