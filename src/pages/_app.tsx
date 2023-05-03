import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <style jsx global>
                {
                    `
                      html {
                        font-family: ${ openSans.style.fontFamily };
                      }
                    `
                }
            </style>
            <Head>
                <title>eCommerce</title>
                <meta name="description" content="ecommerce next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Component { ...pageProps } />
        </>
    );
}
