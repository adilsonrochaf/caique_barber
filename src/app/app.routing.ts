import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { SiteComponent } from './site/site.component';
import { LoginComponent } from './login/login.component';
import { AgendamentosComponent } from './agendamentos/agendamentos.component';
import { LayoutComponent } from './layout/layout.component';
import { BarbeirosComponent } from './barbeiros/barbeiros.component';
import { ServicosComponent } from './servicos/servicos.component';
import { UsuarioComponent } from './usuario/usuario.component';


export const routes: Routes =[
  { path: '', component: SiteComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'sistema',
    component: LayoutComponent,
    children: [
      { path: 'agendamentos', component: AgendamentosComponent },
      { path: 'barbeiros', component: BarbeirosComponent },
      { path: 'servicos', component: ServicosComponent },
      { path: 'usuario', component: UsuarioComponent }
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
