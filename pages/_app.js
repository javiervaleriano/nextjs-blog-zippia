import Head from 'next/head'
import Header from '../components/header/header'
import '../styles/globals.css'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
    // Set a state of the app name to pass as a property
    const [nameApp] = useState('Javippia');

    return (
        <>
            <Head>
                <title>Javippia</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="DC.Language" scheme="RFC1766" content="English" />
                <meta name="author" content="Javier Valeriano" />
                <meta name="reply-to" content="jvalerianoz15@gmail.com" />
                <link rev="made" href="mailto:jvalerianoz15@gmail.com" />
                <meta name="description" content="Upwork test made with Next.js" />
                <meta name="keywords" content="Upwork,upwork,test,NextJS,Next,nextjs,nextJs,React,react,react-dom,javippia,Javippia,jobs,job"></meta>
                {/* BOOTSTRAP 5 */}
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
            </Head>
            <Header titleApp={nameApp} />
            <main>
                <Component {...pageProps} />
            </main>

            {/* JavaScript for Bootstrap 5 animations */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></script>
        </>
    )
}

export default MyApp
