import "../styles/input.css"
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <link rel="icon" href="/favicon.svg" />
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
