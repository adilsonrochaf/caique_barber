import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SiteComponent } from './site/site.component';
import { AppRoutingModule } from './app.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AgendamentosComponent } from './agendamentos/agendamentos.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BarbeirosComponent } from './barbeiros/barbeiros.component';
import { ServicosComponent } from './servicos/servicos.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioComponent } from './usuario/usuario.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { AuthInterceptor } from './auth.interceptor';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { PoliticaDePrivacidadeComponent } from './politica-de-privacidade/politica-de-privacidade.component';


export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    SiteComponent,
    LoginComponent,
    AgendamentosComponent,
    LayoutComponent,
    NavbarComponent,
    BarbeirosComponent,
    ServicosComponent,
    UsuarioComponent,
    ModalDeleteComponent,
    CookieBannerComponent,
    PoliticaDePrivacidadeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot(),
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
