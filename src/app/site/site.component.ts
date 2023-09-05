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
  nomeCliente?: string | null;
  telefoneCliente?: string | null;
  agendamentosCliente: any = [];
  loadingDates: boolean = false;
  loadingHours: boolean = false;
  telefoneValue: string = '';
  mostrarAgendamentos: boolean = false;

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
      }
    });
    this.agendamentoForm.get('servico')?.valueChanges.subscribe(servico_id => {
      const barbeiro_id = this.agendamentoForm.get('barbeiro')?.value;
      if (servico_id && barbeiro_id) {
        const servico = this.servicos.find((r: any) => r.id = servico_id);
        this.buscarDiasLivres(servico.tempo, Number(barbeiro_id));
      }
    });
    this.agendamentoForm.get('data')?.valueChanges.subscribe(data => {
      if (data) {
        const servico_id = this.agendamentoForm.get('servico')?.value;
        const servico = this.servicos.find((r: any) => r.id = servico_id);
        const barbeiro_id = this.agendamentoForm.get('barbeiro')?.value;
        this.buscarHorariosLivres(servico.tempo, Number(barbeiro_id), data);
      }
    });
    this.buscaAgendamentoCliente();
  }

  buscaAgendamentoCliente(): void {
    this.nomeCliente = localStorage.getItem('nomeCliente');
    this.telefoneCliente = localStorage.getItem('telefoneCliente') ? localStorage.getItem('telefoneCliente') : this.telefoneValue;
    if (this.telefoneCliente) {
      this.apiService.getAgendamentosCliente(this.telefoneCliente).subscribe((agendamentos) => {
        const dataAtual: Date = new Date();
        const agendamentosFiltrados: string[] = agendamentos.filter((agendamento: any) => this.validaData(agendamento.data_hora) && new Date(agendamento.data_hora) >= dataAtual);
        this.agendamentosCliente = agendamentosFiltrados;
      });
    }
  }

  novoAgendamento(): void {
    this.agendamentosCliente = [];
    this.mostrarAgendamentos = false;
  }

  validaData(dataStr: string): boolean {
    return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(dataStr);
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
    this.loadingDates = true;
    this.apiService.getDiasLivres(barbeiro_id, tempoServico).subscribe((dias: any) => {
      this.diasLivres = dias;
      this.loadingDates = false;
      this.agendamentoForm.get('data')?.enable();
    });
  }

  buscarHorariosLivres(tempoServico: string, barbeiro_id: number, dataSugerida: string): void {
    this.loadingHours = true;
    this.apiService.getHorariosLivres(barbeiro_id, tempoServico, dataSugerida).subscribe((horarios: any) => {
      this.horariosLivres = horarios;
      this.loadingHours = false;
      this.agendamentoForm.get('horario')?.enable();
    });
  }

  onSubmit(): void {
    localStorage.setItem('nomeCliente', this.agendamentoForm.get('nome')?.value);
    localStorage.setItem('telefoneCliente', this.agendamentoForm.get('telefone')?.value);
    const bodyAgendamento: any = {
      servico_id: Number(this.agendamentoForm.get('servico')?.value),
      barbeiro_id: Number(this.agendamentoForm.get('barbeiro')?.value),
      data_hora: `${this.agendamentoForm.get('data')?.value} ${this.agendamentoForm.get('horario')?.value}`,
      nome_cliente: this.agendamentoForm.get('nome')?.value,
      telefone_cliente: this.agendamentoForm.get('telefone')?.value,
    }
    this.apiService.postAgendamento(bodyAgendamento).subscribe(() => {
      this.agendamentoForm.reset();
      this.agendamentoForm.get('barbeiro')?.setValue('');
      this.agendamentoForm.get('servico')?.setValue('');
      this.agendamentoForm.get('data')?.setValue('');
      this.agendamentoForm.get('horario')?.setValue('');
      this.buscaAgendamentoCliente();
    });
  }


}
