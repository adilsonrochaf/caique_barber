// src/app/services/cookie-consent.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {

  private consentKey = 'cookie_consent';

  constructor() { }

  // Definir o consentimento
  setConsent(consent: 'accepted' | 'rejected'): void {
    localStorage.setItem(this.consentKey, consent);
  }

  // Obter o consentimento
  getConsent(): 'accepted' | 'rejected' | null {
    return localStorage.getItem(this.consentKey) as 'accepted' | 'rejected' | null;
  }

  // Verificar se o consentimento já foi dado
  hasConsented(): boolean {
    const consent = this.getConsent();
    return consent === 'accepted' || consent === 'rejected';
  }
}
