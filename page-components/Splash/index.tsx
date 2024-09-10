"use client";
import "./globals.css";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Flex, Image } from "antd";


function loadScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
    document.head.appendChild(script);
  });
}

export default function HomeCom() {
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
            <HomeCom/>
          </Provider>
        ) : (
          <main>
            <div>
              <Flex
                style={{
                  height: '100vh',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  src="./img/splashScreen.png"
                  alt="Portkey Splash Screen"
                  preview={false}
                  style={{
                    width: '100%',
                    height: '100%',
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