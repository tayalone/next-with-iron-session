import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <SWRConfig
    //   value={{
    //     fetcher: fetchJson,
    //     onError: (err) => {
    //       console.error(err)
    //     },
    //   }}
    // >
      <Component {...pageProps} />
    // </SWRConfig>
  )
}

export default MyApp
