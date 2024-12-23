import '../styles/globals.css';
import ErrorBoundary from '../components/ErrorBoundary';
import { useState } from 'react';

/**
 * Custom App component that wraps all pages with
 * an error boundary and other global providers if needed.
 */
function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  return (
    <ErrorBoundary>
      {loading && <div className="loading-indicator">Loading...</div>}
      <Component {...pageProps} setLoading={setLoading} />
    </ErrorBoundary>
  );
}

export default MyApp;
