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

  getAgendamentosBarbeiro(token: string, barbeiro_id: string, data_sugerida: string): Observable<any>{
    let params = new HttpParams();
    params = params.append('token', token);
    params = params.append('barbeiro_id', barbeiro_id);
    params = params.append('data_sugerida', data_sugerida);
    return this.http.get(`${this.apiRoot}agendamentos/barbeiro/data`, { params: params });
  }

  postServico(body: any, token: string): Observable<any>{
    let params = new HttpParams();
    params = params.append('token', token);
    return this.http.post(`${this.apiRoot}servico`, body, { params: params });
  }

  deleteServico(guidServico: string, token: string): Observable<any>{
    let params = new HttpParams();
    params = params.append('token', token);
    return this.http.delete(`${this.apiRoot}servico/${guidServico}`, { params: params });
  }

  deleteAgendamento(guidAgendamento: string, token: string): Observable<any>{
    let params = new HttpParams();
    params = params.append('token', token);
    return this.http.delete(`${this.apiRoot}agendamentos/${guidAgendamento}`, { params: params });
  }

  getBarbeiroPorGuid(guidBarbeiro: string, token: string): Observable<any>{
    let params = new HttpParams();
    params = params.append('token', token);
    return this.http.get(`${this.apiRoot}barbeiros/${guidBarbeiro}`, { params: params });
  }

  putBarbeiroPorGuid(guidBarbeiro: string, token: string, body: any): Observable<any>{
    let params = new HttpParams();
    params = params.append('token', token);
    return this.http.put(`${this.apiRoot}barbeiros/${guidBarbeiro}`, body, { params: params });
  }

  getDominios(tpDominio: string, token: string): Observable<any>{
    let params = new HttpParams();
    params = params.append('token', token);
    params = params.append('tpDominio', tpDominio);
    return this.http.get(`${this.apiRoot}dominios`, { params: params });
  }

  postPeriodo(token: string, body: any): Observable<any>{
    let params = new HttpParams();
    params = params.append('token', token);
    return this.http.post(`${this.apiRoot}periodo`, body, { params: params });
  }

  deletePeriodo(guidPeriodo: string, token: string): Observable<any>{
    let params = new HttpParams();
    params = params.append('token', token);
    return this.http.delete(`${this.apiRoot}periodo/${guidPeriodo}`, { params: params });
  }

}
