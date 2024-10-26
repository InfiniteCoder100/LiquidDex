"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { WagmiProvider } from "wagmi";
// import { EthersExtension } from "@dynamic-labs/ethers-v5";
import { config } from "@/lib/wagmi-config";
import {
  DynamicContextProvider,
  EthereumWalletConnectors,
  DynamicWagmiConnector,
} from "@/lib/dynamic";
import { evmNetworks } from "@/lib/custom-chains";

const queryClient = new QueryClient();

export function Providers(props: { children: ReactNode }) {
  console.log("render layout");

  return (
    <DynamicContextProvider
      settings={{
        environmentId: "f53767b2-81bb-4f32-9aea-98d71b5acc33",
        //@ts-expect-error Ethereum Wallet Connector error
        walletConnectors: [EthereumWalletConnectors],
        overrides: { evmNetworks },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{props.children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
