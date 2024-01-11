import '@/styles/globals.css'
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style

export default function App({ Component, pageProps }) {

  return <Component {...pageProps} />
}
