import * as testnetConfig from "./login.config.testnet";
import * as mainnetConfig from "./login.config.mainnet";

export default process.env.NEXT_PUBLIC_APP_ENV === "test"
  ? testnetConfig
  : mainnetConfig;
