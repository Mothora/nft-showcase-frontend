import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Web3Provider from "~/web3/web3Provider";
import Layout from "~/components/layout";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <Web3Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3Provider>
  );
};

export default App;
