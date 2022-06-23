import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { LugusProvider } from "../context/LugusContext";
import { ModalProvider } from "react-simple-hook-modal";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl="https://lckrdruoojvn.usemoralis.com:2053/server"
      appId="VUFAbKrH8ln58kyuNgTPZ4jk0mDTbVeZiqiDrFLi"
    >
      <LugusProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </LugusProvider>
    </MoralisProvider>
  );
}

export default MyApp;
