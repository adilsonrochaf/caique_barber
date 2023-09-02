import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SiteComponent } from './site/site.component';
import { AppRoutingModule } from './app.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AgendamentosComponent } from './agendamentos/agendamentos.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BarbeirosComponent } from './barbeiros/barbeiros.component';
import { ServicosComponent } from './servicos/servicos.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'

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
    ServicosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
