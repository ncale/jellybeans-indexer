import { createConfig } from "@ponder/core";
import { http } from "viem";

import { JellyBeansAbi } from "./abis/JellyBeansAbi";

export default createConfig({
  networks: {
    optimism: {
      chainId: 10,
      transport: http(process.env.PONDER_RPC_URL_10),
    },
  },
  contracts: {
    Jellybeans: {
      abi: JellyBeansAbi,
      address: "0x9A34acbf83753c9a87D3b8EC721867146e67eBdC",
      network: "optimism",
      startBlock: 126229322,
    },
  },
});
