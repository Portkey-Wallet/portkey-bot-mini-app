"use client";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import React, { useEffect, useRef } from "react";
import { Button, Flex, Image, Typography } from "antd";
import { WalletTypeEnum } from "@aelf-web-login/wallet-adapter-base";
import AssetsPage from "../AssetsPage";
import { TelegramPlatform } from "@portkey/did-ui-react";
import { reportAccount } from "@/api/request";
import request from "@/api/axios";
const { Text } = Typography;

export default function Home() {
  const {
    connectWallet,
    disConnectWallet,
    walletInfo,
    lock,
    isLocking,
    walletType,
    isConnected,
    loginError,
  } = useConnectWallet();
  const reported = useRef<boolean>(false);
  const loading = useRef<boolean>(false);
  console.log(walletInfo, isConnected, "walletInfo===");
  console.log(walletType === WalletTypeEnum.aa, isConnected, "showAssets===");
  console.log(isConnected, isLocking, "isLocking===");

  useEffect(() => {
    (async () => {
      if(loading.current){
        return;
      }
      if(isConnected && !reported.current) {
       try {
        loading.current = true;
        await request.getAAConnectToken(walletInfo?.extraInfo?.portkeyInfo);
        const caHash = walletInfo?.extraInfo?.portkeyInfo?.caInfo?.caHash;
        const operationType = walletInfo?.extraInfo?.portkeyInfo?.createType === 'recovery' ? 'SocialRecovery': 'Register';
        await reportAccount({caHash, operationType});
        reported.current = true;
       } finally {
        loading.current = false;

       }
      }
    })();
  }, [isConnected, isLocking, walletInfo?.extraInfo?.portkeyInfo, walletInfo?.extraInfo?.portkeyInfo?.caInfo?.caHash, walletInfo?.extraInfo?.portkeyInfo?.createType]);

  return (
    <main>
      <div>
        {walletType === WalletTypeEnum.aa && isConnected ? <AssetsPage />:  <Flex
          style={{
            width: '100vw',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#531DDC',
          }}
      >
           <Image
              src="./img/splashScreen.png"
              alt="Portkey Splash Screen"
              preview={false}
              style={{
                width: '100vw',
                height: '100vh',
                objectFit: 'cover',
              }}
            />
      </Flex>}
      </div>
    </main>
  );
}
