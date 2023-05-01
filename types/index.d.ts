export * from './nft.ts';

declare module '*.svg' {
  const content: any;
  export default content;
}

declare global {
  interface Window {
    themeManager: any;
    [x: string]: any;
  }
}

declare type Price = {
  [x: string]: number;
};

export declare type TokenPrice = {
  usd: number;
  usd_24h_change: number;
  [x: string]: number | number;
};

export declare type PriceTable = {
  solana: { usd: number; [x: string]: number | string | undefined };
  ethereum: { usd: number; [x: string]: number | string | undefined };
  xrp: { usd: number; [x: string]: number | string | undefined };
  bitcoin: { usd: number; [x: string]: number | string | undefined };
  xlm: { usd: number; [x: string]: number | string | undefined };
  shib: { usd: number; [x: string]: number | string | undefined };
  [x: string]: { usd: number; [x: string]: number | string | undefined };
};

export declare type Wallet = {
  orderIndex: number;
  accountName?: string;
  publicKey: string;
  secretKey?: string;
  balance: number;
  usdBalance: number;
  mnemonic?: string;
  passphrase?: string;
  symbol?: string;
  icon?: string;
  name?: string;
  tokenId: string;
  importStrategy?: string;
  tokenPrice?: TokenPrice;
};

declare type TransferState = {
  amount: number;
  recipientPublicKey: string;
  inputAmountType?: string;
};

declare type SocialNetwork = {
  id: string;
  icon: string;
  url: string;
};

declare type Account = {
  publicKey: string;
  secretKey?: string;
};
