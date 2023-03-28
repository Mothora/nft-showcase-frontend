import {
  getDefaultWallets,
  midnightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { ReactNode } from "react";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrumGoerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { env } from "~/env.mjs";

const { chains, provider, webSocketProvider } = configureChains(
  [arbitrumGoerli],
  [
    alchemyProvider({ apiKey: env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const appInfo = {
  appName: "Mothora NFT",
};

interface Web3ProviderProps {
  children: ReactNode;
}
const Web3Provider = ({ children }: Web3ProviderProps) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        appInfo={appInfo}
        chains={chains}
        theme={midnightTheme({
          accentColor: "transparent",
          accentColorForeground: "white",
          borderRadius: "small",
          fontStack: undefined,
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Web3Provider;
