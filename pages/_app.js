import '../styles/globals.css'
import getContract from '../utils/interactions'
import { ChakraProvider } from '@chakra-ui/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import "@rainbow-me/rainbowkit/styles.css";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import "../styles/globals.css";

import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  polygonMumbai
} from 'wagmi/chains';

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'De-Vac',
  projectId: 'e80740a448d42dd1cb53869405e618e2',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider theme={darkTheme()} chains={chains} >
        <ChakraProvider>
          <Component {...pageProps} getContract={getContract} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
