import { computed, Injectable, signal } from '@angular/core';

const TOKEN_KEY = 'fb-access-token';
const CODE_VERIFIER_KEY = 'fb-code-verifier';

@Injectable({ providedIn: 'root' })
export class FbAuthService {
  private readonly _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  readonly token = this._token.asReadonly();
  readonly isLoggedIn = computed(() => !!this._token());

  async login(clientId: string, redirectUri: string): Promise<void> {
    const codeVerifier = this.generateCodeVerifier();
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);

    sessionStorage.setItem(CODE_VERIFIER_KEY, codeVerifier);

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'email,openid,public_profile,user_photos,user_likes',
      response_type: 'code',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      state: 'fbauth',
    });

    window.location.href = `https://www.facebook.com/v25.0/dialog/oauth?${params}`;
  }

  async handleCallback(code: string, clientId: string, redirectUri: string): Promise<void> {
    const codeVerifier = sessionStorage.getItem(CODE_VERIFIER_KEY);
    if (!codeVerifier) throw new Error('No code verifier found');

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
      code,
    });

    const response = await fetch(
      `https://graph.facebook.com/v25.0/oauth/access_token?${params}`,
    );
    const data = await response.json();

    if (data.access_token) {
      localStorage.setItem(TOKEN_KEY, data.access_token);
      this._token.set(data.access_token);
      sessionStorage.removeItem(CODE_VERIFIER_KEY);
    } else {
      throw new Error(data.error?.message ?? 'Token exchange failed');
    }
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this._token.set(null);
  }

  private generateCodeVerifier(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private async generateCodeChallenge(verifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }
}
