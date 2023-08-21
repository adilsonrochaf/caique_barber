import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  agendamentoForm: FormGroup;
  barbeiros: any = [];
  servicos: any = [];
  dataDisabled = true;
  horariosDisabled = true;
  diasLivres: any = [];
  horariosLivres: any = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.agendamentoForm = this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      telefone: this.fb.control('', [Validators.required]),
      barbeiro: this.fb.control('', [Validators.required]),
      servico: this.fb.control('', [Validators.required]),
      data: this.fb.control('', [Validators.required]),
      horario: this.fb.control('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.agendamentoForm.get('data')?.disable();
    this.agendamentoForm.get('horario')?.disable();
    this.buscarBarbeiros();
    this.buscarServicos();
    this.agendamentoForm.get('barbeiro')?.valueChanges.subscribe(barbeiro_id => {
      const servico_id = this.agendamentoForm.get('servico')?.value;
      if (barbeiro_id && servico_id) {
        const servico = this.servicos.find((r: any) => r.id = servico_id);
        this.buscarDiasLivres(servico.tempo, Number(barbeiro_id));
        this.agendamentoForm.get('data')?.enable();
      }
    });
    this.agendamentoForm.get('servico')?.valueChanges.subscribe(servico_id => {
      const barbeiro_id = this.agendamentoForm.get('barbeiro')?.value;
      if (servico_id && barbeiro_id) {
        const servico = this.servicos.find((r: any) => r.id = servico_id);
        this.buscarDiasLivres(servico.tempo, Number(barbeiro_id));
        this.agendamentoForm.get('data')?.enable();
      }
    });
    this.agendamentoForm.get('data')?.valueChanges.subscribe(data => {
      if (data) {
        const servico_id = this.agendamentoForm.get('servico')?.value;
        const servico = this.servicos.find((r: any) => r.id = servico_id);
        const barbeiro_id = this.agendamentoForm.get('barbeiro')?.value;
        this.buscarHorariosLivres(servico.tempo, Number(barbeiro_id), data);
        this.agendamentoForm.get('horario')?.enable();
      }
    });
  }

  buscarBarbeiros(): void {
    this.apiService.getBarbeiros().subscribe((barbeiros: any) => {
      this.barbeiros = barbeiros;
    });
  }

  buscarServicos(): void {
    this.apiService.getServicos().subscribe((servicos: any) => {
      this.servicos = servicos;
    });
  }

  buscarDiasLivres(tempoServico: string, barbeiro_id: number): void {
    this.apiService.getDiasLivres(barbeiro_id, tempoServico).subscribe((dias: any) => {
      this.diasLivres = dias;
    });
  }

  buscarHorariosLivres(tempoServico: string, barbeiro_id: number, dataSugerida: string): void {
    this.apiService.getHorariosLivres(barbeiro_id, tempoServico, dataSugerida).subscribe((horarios: any) => {
      this.horariosLivres = horarios;
    });
  }

  onSubmit(): void {
    const bodyAgendamento: any = {
      servico_id: this.agendamentoForm.get('servico')?.value,
      barbeiro_id: this.agendamentoForm.get('barbeiro')?.value,
      data_hora: `${this.agendamentoForm.get('data')?.value} ${this.agendamentoForm.get('horario')?.value}`,
      nome_cliente: this.agendamentoForm.get('nome')?.value,
      telefone_cliente: this.agendamentoForm.get('telefone')?.value,
    }
    console.log(bodyAgendamento);
  }

}
