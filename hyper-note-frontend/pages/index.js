import Head from 'next/head'
import Router from 'next/router';
export default function App() {
  return (
        <div>
            <Head>
              <title>Next App</title>
              <link rel="icon" href="/favicon.svg" />
            </Head>
            <button type="button" onClick={() => Router.push('/home')}>Home</button>
        </div>
    )
}
