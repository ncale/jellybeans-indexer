import { createConfig } from "@ponder/core";
import { http } from "viem";

import { JellybeansAbi } from "./abis/JellybeansAbi";

export default createConfig({
  networks: {
    optimismSepolia: {
      chainId: 11155420,
      transport: http(process.env.PONDER_RPC_URL_11155420),
    },
  },
  contracts: {
    Jellybeans: {
      abi: JellybeansAbi,
      address: "0x9A34acbf83753c9a87D3b8EC721867146e67eBdC",
      network: "optimismSepolia",
      startBlock: 17488066,
    },
  },
});
