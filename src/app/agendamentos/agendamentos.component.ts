import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { format } from 'date-fns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss']
})
export class AgendamentosComponent implements OnInit {

  agendamentos: any[] = [];
  filterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.filterForm = this.fb.group({
      dataSugerida: this.fb.control('', [Validators.required])
    });
  }

  ngOnInit(): void {
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
      })
    }
  }

}
