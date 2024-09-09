import * as testnetConfig from "./login.config.testnet";
import * as mainnetConfig from "./login.config.mainnet";

export default process.env.NEXT_PUBLIC_NETWORK_TYPE === "test"
  ? testnetConfig
  : mainnetConfig;
