"use client";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import React, { useEffect } from "react";
import { Button, Flex, Image, Typography } from "antd";
import { WalletTypeEnum } from "@aelf-web-login/wallet-adapter-base";
import AssetsPage from "../AssetsPage";
import { TelegramPlatform } from "@portkey/did-ui-react";
const { Text } = Typography;

export default function HomeCom() {
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

  console.log(walletInfo, isConnected, "walletInfo===");
  console.log(walletType === WalletTypeEnum.aa, isConnected, "showAssets===");
  console.log(isConnected, isLocking, "isLocking===");

  useEffect(() => {
    console.log('window?.Telegram', window?.Telegram);
    console.log('TelegramPlatform.isTelegramPlatform()', TelegramPlatform.isTelegramPlatform());
  }, [isConnected, isLocking]);

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
