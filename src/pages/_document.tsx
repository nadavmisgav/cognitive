import { Head, Html, Main, NextScript } from 'next/document'
// TODO: check if needed
export default function Document() {
    return (
        <Html>
            <Head />
            <body className='p-0 m-0 bg-gray-700 text-gray-200 relative'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}