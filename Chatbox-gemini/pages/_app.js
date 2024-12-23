// pages/_app.js
import '../styles/globals.css';
import ErrorBoundary from '../components/ErrorBoundary';

/**
 * Custom App component that wraps all pages with
 * an error boundary and other global providers if needed.
 */
function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
