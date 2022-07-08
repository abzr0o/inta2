import "../styles/globals.scss"

import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import { store } from "../utils/store"
import { QueryClient, QueryClientProvider } from "react-query"
function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient()
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp
