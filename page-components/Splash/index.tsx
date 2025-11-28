"use client";
// import "./globals.css";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Flex, Image } from "antd";
import Home from "../Home";


function loadScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
    document.head.appendChild(script);
  });
}

export default function Splash() {
  const [loadTgJs, setLoadTgJs] = useState<boolean>(false);
  const Provider = useMemo(() => {
    return dynamic(() => import('@/provider'), { ssr: false });
  }, []);

  useEffect(() => {
    loadScript('/telegram-web-app.js')
      .then(() => {
        console.log('Script loaded successfully.');
        setLoadTgJs(true);
      })
      .catch((error) => {
        console.error('Script loaded failed.', error);
      });
  }, []);

  return (
    <>
     {loadTgJs ? (
          <Provider>
            <Home/>
          </Provider>
        ) : (
          <main>
            <div>
              <Flex
                style={{
                  height: '100vh',
                  width: '100vw',
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
                    height: '100vh',
                    width: '100vw',
                    objectFit: 'cover',
                  }}
                />
              </Flex>
            </div>
          </main>
        )}
    </>
  );
}