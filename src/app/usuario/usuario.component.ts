import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit{

  barbeirosForm: FormGroup;
  periodosForm: FormGroup;
  guidBarbeiro!: string;
  idBarbeiro!: number;
  periodos: any[] = [];
  diasSemana: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {
    this.barbeirosForm = this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      telefone: this.fb.control('', [Validators.required]),
      senha: this.fb.control('', [Validators.required])
    });
    this.periodosForm = this.fb.group({
      hora_inicio: this.fb.control('', [Validators.required]),
      hora_fim: this.fb.control('', [Validators.required]),
      dia_semana: this.fb.control('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.guidBarbeiro = localStorage.getItem('guidBarbeiro') || '';
    this.idBarbeiro = Number(localStorage.getItem('idBarbeiro'));
    this.buscaBarbeiro();
  }

  buscaDiasDaSemana(): void {
    this.diasSemana = [];
    this.apiService.getDominios('dia_semana').subscribe((res) => {
      const diaSemanaIds = this.periodos.map(item => item.dia_semana_id);
      res.forEach((element: any) => {
        const apareceDuasVezes: boolean = this.verificaDiaDuplo(diaSemanaIds, element.id_dominio);
        if (!apareceDuasVezes) {
          this.diasSemana.push(element);
        }
      });
    });
  }

  verificaDiaDuplo(lista: number[], numeroAlvo: number): boolean {
    let contador = 0;

    for (let i = 0; i < lista.length; i++) {
        if (lista[i] === numeroAlvo) {
            contador++;
            if (contador === 2) {
                return true;
            }
        }
    }
    return false;
}

  buscaBarbeiro(): void {
    this.apiService.getBarbeiroPorGuid(this.guidBarbeiro).subscribe((res) => {
      this.barbeirosForm.get('nome')?.setValue(res.nome);
      this.barbeirosForm.get('telefone')?.setValue(res.telefone);
      this.barbeirosForm.get('senha')?.setValue(null);
      this.periodos = res.periodos_de_trabalho.sort((a: any, b: any) => a.dia_semana_id - b.dia_semana_id);
      this.buscaDiasDaSemana();
      this.spinner.hide();
    }, () => {
      this.buscaDiasDaSemana();
      this.spinner.hide();
    });
  }

  putBarbeiro(): void {
    this.spinner.show();
    const body = {
      nome: this.barbeirosForm.get('nome')?.value,
      telefone: this.barbeirosForm.get('telefone')?.value,
      senha: this.barbeirosForm.get('senha')?.value,
    }
    this.apiService.putBarbeiroPorGuid(this.guidBarbeiro, body).subscribe((res) => {
      this.barbeirosForm.get('nome')?.setValue(res.nome);
      this.barbeirosForm.get('telefone')?.setValue(res.telefone);
      this.barbeirosForm.get('senha')?.setValue(null);
      this.periodos = res.periodos_de_trabalho.sort((a: any, b: any) => a.dia_semana_id - b.dia_semana_id);
      this.spinner.hide();
    });
  }

  addPeriodoTrabalho(): void {
    this.spinner.show();
    const body = {
      barbeiro_id: this.idBarbeiro,
      hora_inicio: this.adicionarDoisPontosAosDigitos(this.periodosForm.get('hora_inicio')?.value),
      hora_fim: this.adicionarDoisPontosAosDigitos(this.periodosForm.get('hora_fim')?.value),
      dia_semana_id: Number(this.periodosForm.get('dia_semana')?.value),
    }
    this.apiService.postPeriodo(body).subscribe(() => {
      this.buscaBarbeiro();
      this.periodosForm.reset();
      this.periodosForm.get('dia_semana')?.setValue('');
    });
  }

  adicionarDoisPontosAosDigitos(inputString: string): string {
    const grupos = inputString.match(/.{1,2}/g);
    if (grupos) {
      const resultado = grupos.join(":");
      return resultado;
    } else {
      return inputString;
    }
  }

  deletarPeriodo(guidPeriodo: string): void {
    const modalRef = this.modalService.open(ModalDeleteComponent);
    modalRef.componentInstance.result.subscribe({
      next: (response: any) => {
        if (response) {
          this.spinner.show();
          this.apiService.deletePeriodo(guidPeriodo).subscribe({
            next: () => {
              this.buscaBarbeiro();
            },
            error: (erro) => {
              console.log(erro);
              this.spinner.hide();
            }
          });
        }
      }
    });
  }
}
