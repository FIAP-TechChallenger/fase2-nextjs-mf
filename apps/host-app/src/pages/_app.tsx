import "./globals.css";
import { AppProps } from "next/app";
import { TransacoesProvider } from "@/context/TransacoesContext";
import { FiltrosTransacoesProvider } from "@/context/FiltroTransacoesContext";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/store";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
      <TransacoesProvider>
        <FiltrosTransacoesProvider>
          <Component {...pageProps} />
        </FiltrosTransacoesProvider>
      </TransacoesProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
