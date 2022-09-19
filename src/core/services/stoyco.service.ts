import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WalletInfo } from '../models/walletInfo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoycoService {
  constructor(private http: HttpClient) {}

  saveInfoWallet(walletInfo: WalletInfo) {
    return this.http.post<WalletInfo>(
      `${environment.stoycoApiUrl}/ms-core/wallet`,
      walletInfo
    );
  }
}
