import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { SiteComponent } from './site/site.component';
import { LoginComponent } from './login/login.component';
import { AgendamentosComponent } from './agendamentos/agendamentos.component';
import { LayoutComponent } from './layout/layout.component';


export const routes: Routes =[
  { path: '', component: SiteComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'sistema',
    component: LayoutComponent,
    children: [
      { path: 'agendamentos', component: AgendamentosComponent }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
