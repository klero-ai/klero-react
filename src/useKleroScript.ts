import { useState, useEffect } from 'react';

const loadedScripts = new Set<string>();
let loadPromise: Promise<void> | null = null;

export function useKleroScript(baseUrl: string): { loaded: boolean; error: string | null } {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const src = `${baseUrl}/embed/klero.js`;

    if (loadedScripts.has(src)) {
      setLoaded(true);
      return;
    }

    if (loadPromise) {
      loadPromise.then(() => setLoaded(true)).catch((e) => setError(String(e)));
      return;
    }

    loadPromise = new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
      if (existing) {
        loadedScripts.add(src);
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => {
        loadedScripts.add(src);
        resolve();
      };
      script.onerror = () => reject(new Error(`Failed to load Klero script: ${src}`));
      document.head.appendChild(script);
    });

    loadPromise
      .then(() => setLoaded(true))
      .catch((e) => setError(String(e)));
  }, [baseUrl]);

  return { loaded, error };
}
