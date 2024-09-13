import axios from 'axios';

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ChainId } from '@portkey/types';
import { stringify } from 'querystring';
import { DIDWalletInfo } from '@portkey/did-ui-react';
import AElf from 'aelf-sdk';
import loginConfig from '@/constants/config/login.config';
const BEARER = 'Bearer';
const DAY = 24 * 60 * 60 * 1000;
const {
  PORTKEY_SERVER_URL,
  CONNECT_SERVER,
} = loginConfig
class Request {
  instance: AxiosInstance;
  baseConfig: AxiosRequestConfig = { baseURL: `${PORTKEY_SERVER_URL}/api`, timeout: 60000 };

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign({}, this.baseConfig, config));
  }

  public async request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }

  public post<T, R>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.post(url, data, config);
  }

  public put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.put(url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }
  public queryAuthorization = async (config: RefreshTokenConfig) => {
    const { ..._config } = config;
    const connectInstance = axios.create(Object.assign({}, { baseURL: `${CONNECT_SERVER}/connect/`, timeout: 60000 }, {}));
    const result = await connectInstance.post<{access_token: string}>('/token', stringify({ ..._config, chain_id: config.chainId }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    console.log('queryAuthorization result is:', result);
    return `${BEARER} ${result.data?.access_token}`;
  };
  private isValidRefreshTokenConfig = (config: RefreshTokenConfig) => {
    const expireTime = config.timestamp + 1 * DAY;
    return expireTime >= Date.now();
  };
  private getConnectToken = async (refreshTokenConfig?: RefreshTokenConfig) => {
    try {
      if (!refreshTokenConfig || !this.isValidRefreshTokenConfig(refreshTokenConfig)) return;
      const authorization = await request.queryAuthorization(refreshTokenConfig);
      request.instance.defaults.headers.common['Authorization'] = authorization;
      return authorization;
    } catch (error) {
      console.log(error, '====error-getConnectToken');
      return;
    }
  };
  public getAAConnectToken = async (didWallet: DIDWalletInfo) => {
    const timestamp = Date.now();
      const message = Buffer.from(`${didWallet.walletInfo.address}-${timestamp}`).toString('hex');
      const signature = AElf.wallet.sign(message, didWallet.walletInfo.keyPair).toString('hex');
      const pubKey = (didWallet.walletInfo.keyPair as any).getPublic('hex');
     return await this.getConnectToken({
        grant_type: 'signature',
        client_id: 'CAServer_App',
        scope: 'CAServer',
        signature: signature || '',
        pubkey: pubKey|| '',
        timestamp: timestamp || 0,
        ca_hash: didWallet.caInfo.caHash,
        chainId: didWallet.chainId,
      });
  }
}
export type RefreshTokenConfig = {
  grant_type: 'signature';
  client_id: 'CAServer_App';
  scope: 'CAServer';
  signature: string;
  pubkey: string;
  timestamp: number;
  ca_hash: string;
  chainId: ChainId;
};


const request = new Request({});
export default request;
