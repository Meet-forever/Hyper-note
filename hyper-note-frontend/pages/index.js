import Head from 'next/head'
import Router from 'next/router';
export default function App() {
  return (
    <div>
      <Head>
        <title>App</title>
      </Head>
      <button type="button" onClick={() => Router.push('/home')}>Home</button>
    </div>
  )
}
