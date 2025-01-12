// src/app/components/cookie-banner/cookie-banner.component.ts

import { Component, OnInit } from '@angular/core';
import { CookieConsentService } from '../../services/cookie-consent.service';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss']
})
export class CookieBannerComponent implements OnInit {

  isConsentGiven: boolean = false;

  constructor(private cookieConsentService: CookieConsentService) { }

  ngOnInit(): void {
    this.isConsentGiven = this.cookieConsentService.hasConsented();
  }

  acceptCookies(): void {
    this.cookieConsentService.setConsent('accepted');
    this.isConsentGiven = true;
    // Aqui você pode inicializar scripts que dependem de cookies
  }

  rejectCookies(): void {
    this.cookieConsentService.setConsent('rejected');
    this.isConsentGiven = true;
    // Aqui você pode desativar scripts que não são essenciais
  }

  redirectPoliticaPrivacidade(): void {
    
  }

}
