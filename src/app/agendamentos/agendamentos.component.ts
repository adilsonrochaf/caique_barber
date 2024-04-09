import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { format } from 'date-fns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss']
})
export class AgendamentosComponent implements OnInit {

  agendamentos: any[] = [];
  filterForm: FormGroup;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {
    this.filterForm = this.fb.group({
      dataSugerida: this.fb.control('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.token = localStorage.getItem('accessToken') || '';
    const hoje = new Date();
    const dataFormatada = format(hoje, 'yyyy-MM-dd');
    this.filterForm.get('dataSugerida')?.setValue(dataFormatada);
    this.buscaAgendamentosBarbeiro(dataFormatada);
  }

  buscaAgendamentosBarbeiro(dataSugerida?: string): void {
    if (!dataSugerida) {
      dataSugerida = this.filterForm.get('dataSugerida')?.value;
    }
    const idBarbeiro = localStorage.getItem('idBarbeiro');
    const token = localStorage.getItem('accessToken');
    if (token && idBarbeiro && dataSugerida) {
      this.apiService.getAgendamentosBarbeiro(token, idBarbeiro, dataSugerida).subscribe((agendamentos) => {
        this.agendamentos = agendamentos;
        this.spinner.hide();
      })
    }
  }

  deletarAgendamento(guidAgendamento: string): void {
    const modalRef = this.modalService.open(ModalDeleteComponent);
    modalRef.componentInstance.result.subscribe({
      next: (response: any) => {
        if (response) {
          this.spinner.show();
          this.apiService.deleteAgendamento(guidAgendamento, this.token).subscribe({
            next: () => {
              const hoje = new Date();
              const dataFormatada = format(hoje, 'yyyy-MM-dd');
              this.filterForm.get('dataSugerida')?.setValue(dataFormatada);
              this.buscaAgendamentosBarbeiro(dataFormatada);
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
