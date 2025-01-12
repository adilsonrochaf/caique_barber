import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiRoot = environment.API;

  constructor(private http: HttpClient) { }

  postAuth(telefone: string, senha: string): Observable<any>{
    let params = new HttpParams();
    return this.http.post(`${this.apiRoot}login?telefone=${telefone}&senha=${senha}`, {});
  }

  getBarbeiros(): Observable<any>{
    return this.http.get(`${this.apiRoot}barbeiros`);
  }

  getServicos(): Observable<any>{
    return this.http.get(`${this.apiRoot}servico`);
  }

  getAgendamentosCliente(telefoneCliente: string): Observable<any>{
    let params = new HttpParams();
    params = params.append('telefone_cliente', telefoneCliente);
    return this.http.get(`${this.apiRoot}agendamentos/cliente`, { params: params });
  }

  getDiasLivres(barbeiro_id: number, tempo_servico: string): Observable<any>{
    let params = new HttpParams();
    params = params.append('barbeiro_id', barbeiro_id);
    params = params.append('tempo_servico', tempo_servico);
    return this.http.get(`${this.apiRoot}dias-livres`, { params: params });
  }

  getHorariosLivres(barbeiro_id: number, tempo_servico: string, data_sugerida: string): Observable<any>{
    let params = new HttpParams();
    params = params.append('barbeiro_id', barbeiro_id);
    params = params.append('data_sugerida', data_sugerida);
    params = params.append('tempo_servico', tempo_servico);
    return this.http.get(`${this.apiRoot}horarios-livres`, { params: params });
  }

  postAgendamento(body: any): Observable<any>{
    return this.http.post(`${this.apiRoot}agendamentos`, body);
  }

  getAgendamentosBarbeiro(barbeiro_id: string, data_sugerida: string): Observable<any>{
    let params = new HttpParams();
    params = params.append('barbeiro_id', barbeiro_id);
    params = params.append('data_sugerida', data_sugerida);
    return this.http.get(`${this.apiRoot}agendamentos/barbeiro/data`, { params: params });
  }

  postServico(body: any): Observable<any>{
    return this.http.post(`${this.apiRoot}servico`, body);
  }

  deleteServico(guidServico: string): Observable<any>{
    return this.http.delete(`${this.apiRoot}servico/${guidServico}`);
  }

  deleteAgendamento(guidAgendamento: string): Observable<any>{
    return this.http.delete(`${this.apiRoot}agendamentos/${guidAgendamento}`);
  }

  postBarbeiro(body: any): Observable<any>{
    return this.http.post(`${this.apiRoot}barbeiros`, body);
  }

  getBarbeiroPorGuid(guidBarbeiro: string): Observable<any>{
    return this.http.get(`${this.apiRoot}barbeiros/${guidBarbeiro}`);
  }

  putBarbeiroPorGuid(guidBarbeiro: string, body: any): Observable<any>{
    return this.http.put(`${this.apiRoot}barbeiros/${guidBarbeiro}`, body);
  }

  getDominios(tpDominio: string): Observable<any>{
    let params = new HttpParams();
    params = params.append('tpDominio', tpDominio);
    return this.http.get(`${this.apiRoot}dominios`);
  }

  postPeriodo(body: any): Observable<any>{
    return this.http.post(`${this.apiRoot}periodo`, body);
  }

  deletePeriodo(guidPeriodo: string): Observable<any>{
    return this.http.delete(`${this.apiRoot}periodo/${guidPeriodo}`);
  }

}
