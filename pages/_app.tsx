import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  localWallet,
  metamaskWallet,
  smartWallet,
  coinbaseWallet,
  walletConnect,
  embeddedWallet,
} from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import { API_KEY, FACTORY_ADDRESS } from "../constant/addresses";
import Navbar from "../components/Navbar";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "sepolia";
const smartWalletOptions = {
  factoryAddress: FACTORY_ADDRESS,
  gasless: true,
};
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId="7e9b4a065a1794e93d8839b9ebbbea96"
      activeChain={activeChain}
      // supportedWallets={[
      //   smartWallet({
      //     factoryAddress: FACTORY_ADDRESS,
      //     thirdwebApiKey: API_KEY,
      //     gasless: true,
      //     personalWallets: [metamaskWallet(), localWallet()],
      //   }),
      // ]}
      supportedWallets={[
        smartWallet(metamaskWallet(), smartWalletOptions),
        smartWallet(coinbaseWallet({ recommended: true }), smartWalletOptions),
        smartWallet(walletConnect(), smartWalletOptions),
        smartWallet(localWallet(), smartWalletOptions),
        smartWallet(
          embeddedWallet({
            auth: { options: ["email", "google", "apple", "facebook"] },
          }),
          smartWalletOptions
        ),
      ]}
    >
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
