import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'fb-client-id';

@Injectable({ providedIn: 'root' })
export class FbSettingsService {
  private readonly _clientId = signal<string>(localStorage.getItem(STORAGE_KEY) ?? '');

  readonly clientId = this._clientId.asReadonly();

  setClientId(id: string): void {
    localStorage.setItem(STORAGE_KEY, id);
    this._clientId.set(id);
  }
}
