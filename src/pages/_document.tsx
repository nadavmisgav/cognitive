import { Head, Html, Main, NextScript } from 'next/document'
import Navbar from '../components/Navbar'
// TODO: check if needed
export default function Document() {
    return (
        <Html>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                />
                <link rel="manifest" href="/manifest.json" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;900&display=swap"
                    rel="stylesheet"
                />
                <meta name="theme-color" content="#1E293B" />
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='shortcut icon' href='/favicon.ico' />
                <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/atom-one-dark.min.css"></link>

            </Head>
            <body className='p-0 m-0 bg-gray-800 text-gray-200 relative'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}