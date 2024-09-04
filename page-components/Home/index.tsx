"use client";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import React, { useEffect } from "react";
import { Button, Flex } from "antd";
import { WalletTypeEnum } from "@aelf-web-login/wallet-adapter-base";
import AssetsPage from "../AssetsPage";

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

  const onConnectBtnClickHandler = async () => {
    try {
      const rs = await connectWallet();
      console.log("rs", rs);
    } catch (e: any) {
      // message.error(e.message);
    }
  };

  const onDisConnectBtnClickHandler = () => {
    disConnectWallet();
  };

  useEffect(() => {
    isLocking && connectWallet();
  }, [connectWallet, isConnected, isLocking]);

  return (
    <div>
      <Flex gap={"small"}>
        <Button
          type="primary"
          onClick={onConnectBtnClickHandler}
          disabled={isConnected}>
          {isLocking ? "unlock" : "connect"}
        </Button>
        <div></div>
        <Button type="primary" onClick={lock} disabled={!walletInfo}>
          lock
        </Button>
        <div></div>
        <Button
          type="primary"
          onClick={onDisConnectBtnClickHandler}
          // disabled={isConnected}
        >
          disconnect
        </Button>
      </Flex>

      <div>{JSON.stringify(walletInfo)}</div>

      {walletType === WalletTypeEnum.aa && isConnected && <AssetsPage />}
    </div>
  );
}
