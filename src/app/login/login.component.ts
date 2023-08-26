import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginInvalido = false;

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
      console.log(res);
      if (res.access_token) {
        localStorage.setItem('accessToken', res.access_token);
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
