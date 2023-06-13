import '/styles/globals.css'
import { ReduxProvider } from '../Redux/store';

export default function App({ Component, pageProps }) {
  return (
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>
  )
};