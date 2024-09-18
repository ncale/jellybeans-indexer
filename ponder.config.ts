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
      address: "0x010A7e7FBF07eA28edD81B9aBc4bb17228018c2A",
      network: "optimismSepolia",
    },
  },
});
