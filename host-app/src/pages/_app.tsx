import "./globals.css";
import { AppProps } from "next/app";
import { TransacoesProvider } from "@/context/TransacoesContext";
import { FiltrosTransacoesProvider } from "@/context/FiltroTransacoesContext";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <TransacoesProvider>
        <FiltrosTransacoesProvider>
          <Component {...pageProps} />
        </FiltrosTransacoesProvider>
      </TransacoesProvider>
    </SessionProvider>
  );
}

export default MyApp;
