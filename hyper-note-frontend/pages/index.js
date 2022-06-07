// import Head from 'next/head'
import Router from 'next/router';
export default function App() {
  return (
        <div>
            <button type="button" onClick={() => Router.push('/home')}>Press</button>
        </div>
    )
}
