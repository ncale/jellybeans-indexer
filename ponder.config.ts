import { createConfig } from "@ponder/core";
import { http } from "viem";

import { JellyBeansAbi } from "./abis/JellyBeansAbi";

export default createConfig({
  networks: {
    optimismSepolia: {
      chainId: 11155420,
      transport: http(process.env.PONDER_RPC_URL_11155420),
    },
  },
  contracts: {
    Jellybeans: {
      abi: JellyBeansAbi,
      address: "0x78A205406e2849b04D6c8497e6dd8A4Aee080Bf4",
      network: "optimismSepolia",
      startBlock: 18095104,
    },
  },
});
