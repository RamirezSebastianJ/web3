export class WalletInfo {
  userId: string;
  chainId: string;
  walletId: string;

  constructor(userId: string, chainId: string, walletId: string) {
    this.userId = userId;
    this.chainId = chainId;
    this.walletId = walletId;
  }
}
