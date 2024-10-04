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
      address: "0x5BeB1131Fe1d69a1b178E65768B33BB15162e384",
      network: "optimism",
      startBlock: 126228120,
    },
  },
});
