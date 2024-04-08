import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  closeNavbar(): void {
    const navbarToggler: any = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarCollapse && navbarToggler) {
      // Verifica se o menu está expandido
      if (navbarCollapse.classList.contains('show')) {
        // Simula um clique no botão de toggle para fechar o menu
        navbarToggler.click();
      }
    }
  }

}
