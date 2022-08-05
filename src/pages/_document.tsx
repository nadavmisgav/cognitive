import { Head, Html, Main, NextScript } from 'next/document'
import Navbar from '../components/Navbar'
// TODO: check if needed
export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body className='p-0 m-0 bg-gray-800 text-gray-200 relative'>
                <Navbar />
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}