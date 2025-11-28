import { useCallback, useEffect, useMemo } from "react";
import { WalletTypeEnum } from "@aelf-web-login/wallet-adapter-base";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import { PortkeyDid } from "@aelf-web-login/wallet-adapter-bridge";
import styles from "./styles..module.css";

export interface ExtraInfoForPortkeyAA {
  publicKey: string;
  portkeyInfo: PortkeyDid.DIDWalletInfo & {
    accounts: TAelfAccounts;
    nickName: string;
  };
}

export type TAelfAccounts = {
  AELF?: string;
  tDVV?: string;
  tDVW?: string;
};

export default function AssetsPage() {
  const { walletType, walletInfo } = useConnectWallet();
  console.log('walletInfo is', walletInfo);
  const loginType = walletInfo?.extraInfo?.portkeyInfo.createType;
  useEffect(() => {
    
  }, [loginType]);
  const portkeyAAInfo = useMemo(() => {
    return walletInfo?.extraInfo as ExtraInfoForPortkeyAA;
  }, [walletInfo?.extraInfo]);

  const handleDeleteAccount = useCallback(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (walletType !== WalletTypeEnum.aa) {
      // navigate("/");
    }
  }, [walletType]);

  if (
    walletType !== WalletTypeEnum.aa ||
    !portkeyAAInfo?.portkeyInfo?.pin ||
    !portkeyAAInfo?.portkeyInfo?.chainId
  ) {
    return null;
  }

  return (
    <div className={styles["my-asset-wrapper"]}>
      {portkeyAAInfo?.portkeyInfo?.pin && (
        <PortkeyDid.PortkeyAssetProvider
          originChainId={portkeyAAInfo?.portkeyInfo?.chainId}
          pin={portkeyAAInfo?.portkeyInfo?.pin}>
          <PortkeyDid.Asset
            isShowRamp={false}
            isShowRampBuy={false}
            isShowRampSell={false}
            // backIcon={<LeftOutlined />}
            // onOverviewBack={() => navigate("/")}
            onLifeCycleChange={(lifeCycle) => {
              console.log(lifeCycle, "onLifeCycleChange");
            }}
            onDeleteAccount={handleDeleteAccount}
          />
        </PortkeyDid.PortkeyAssetProvider>
      )}
    </div>
  );
}
