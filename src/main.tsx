import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const App = lazy(() => import('./App.tsx'));
const PreviewV2 = lazy(() => import('./preview-v2/PreviewV2'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={null}>
      {/^\/preview-v2(?:\/|$)/.test(window.location.pathname) ? <PreviewV2 /> : <App />}
    </Suspense>
  </StrictMode>
);
