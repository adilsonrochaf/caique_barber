import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
// import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent implements OnInit {

  servicos: any[] = [];
  servicosForm: FormGroup;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {
    this.servicosForm = this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      valor: this.fb.control('', [Validators.required]),
      tempo: this.fb.control('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.token = localStorage.getItem('accessToken') || '';
    this.buscaservicos();
  }

  buscaservicos(): void {
    this.apiService.getServicos().subscribe((res) => {
      this.servicos = res;
      this.spinner.hide();
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    });
  }

  onSubmit(): void {
    this.spinner.show();
    const body = {
      nome: this.servicosForm.get('nome')?.value,
      valor: Number(this.servicosForm.get('valor')?.value),
      tempo: this.servicosForm.get('tempo')?.value,
    };
    this.apiService.postServico(body, this.token).subscribe(() => {
      this.buscaservicos();
      this.servicosForm.reset();
    }, (error) => {
      console.log(error);
      this.spinner.hide();
      this.servicosForm.reset();
    });
  }

  deletarServico(guidServico: string): void {
    const modalRef = this.modalService.open(ModalDeleteComponent);
    modalRef.componentInstance.result.subscribe({
      next: (response: any) => {
        if (response) {
          this.spinner.show();
          this.apiService.deleteServico(guidServico, this.token).subscribe({
            next: () => {
              this.buscaservicos();
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
