import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent implements OnInit {

  servicos: any[] = [];
  servicosForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private apiService: ApiService
  ) {
    this.servicosForm = this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      valor: this.fb.control('', [Validators.required]),
      tempo: this.fb.control('', [Validators.required])
    });
  }

  ngOnInit(): void {

  }

}
