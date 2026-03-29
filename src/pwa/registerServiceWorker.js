// Registra o service worker em produção para tornar o app instalável e com cache básico.
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        await navigator.serviceWorker.register('/sw.js');
      } catch (error) {
        console.error('Falha ao registrar service worker:', error);
      }
    });
  }
}
