import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginInvalido = false;
  decoded: any = {};

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      telefone: this.fb.control('', [Validators.required]),
      senha: this.fb.control('', [Validators.required])
    });
  }

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm.reset();
  }

  login(): void {
    const telefone = this.loginForm.get('telefone')?.value;
    const senha = this.loginForm.get('senha')?.value;
    this.apiService.postAuth(telefone, senha).subscribe((res) => {
      if (res.access_token) {
        localStorage.setItem('accessToken', res.access_token);
        this.decoded = jwt_decode(res.access_token);
        localStorage.setItem('idBarbeiro', this.decoded.user.id_barbeiro);
        localStorage.setItem('nmBarbeiro', this.decoded.user.nome_barbeiro);
        localStorage.setItem('guidBarbeiro', this.decoded.user.guid_barbeiro);
        localStorage.setItem('telefoneBarbeiro', this.decoded.user.telefone);
        this.loginInvalido = false;
        this.router.navigate(['/sistema/agendamentos']);
      } else {
        this.loginInvalido = true;
      }
    }, () => {
      this.loginInvalido = true
    });
  }

}
