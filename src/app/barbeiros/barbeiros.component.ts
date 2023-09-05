import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-barbeiros',
  templateUrl: './barbeiros.component.html',
  styleUrls: ['./barbeiros.component.scss']
})
export class BarbeirosComponent implements OnInit{

  barbeiros: any[] = [];
  barbeirosForm: FormGroup;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) {
    this.barbeirosForm = this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      telefone: this.fb.control('', [Validators.required]),
      senha: this.fb.control('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.token = localStorage.getItem('accessToken') || '';
    this.buscaBarbeiros();
  }

  buscaBarbeiros(): void {
    this.apiService.getBarbeiros().subscribe((res) => {
      this.barbeiros = res;
      this.spinner.hide();
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    });
  }

  onSubmit(): void {
    this.spinner.show();
    const body = {
      nome: this.barbeirosForm.get('nome')?.value,
      valor: Number(this.barbeirosForm.get('valor')?.value),
      tempo: this.barbeirosForm.get('tempo')?.value,
    };
    this.apiService.postServico(body, this.token).subscribe(() => {
      this.buscaBarbeiros();
      this.barbeirosForm.reset();
    }, (error) => {
      console.log(error);
      this.spinner.hide();
      this.barbeirosForm.reset();
    });
  }

  deletarBarbeiro(guidServico: string): void {
    this.spinner.show();
    this.apiService.deleteServico(guidServico, this.token).subscribe(() => {
      this.buscaBarbeiros();
    }, (error: any) => {
      console.log(error);
      this.spinner.hide();
    });
  }

}
