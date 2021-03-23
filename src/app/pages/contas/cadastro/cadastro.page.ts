import { Component, OnInit }                  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController }                      from '@ionic/angular';
import { ContaService }                       from '../service/conta-service';
import { DateHelper }                         from './../../helpers/dateHelper';

@Component({
  selector: 'cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  contasForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private nav: NavController,
    private conta: ContaService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.contasForm = this.builder.group({
      tipo:      ['', [Validators.required]],
      valor:     ['', [Validators.required, Validators.min(0.01)]],
      parceiro:  ['', [Validators.required, Validators.minLength(5)]],
      descricao: ['', [Validators.required, Validators.minLength(6)]],
      date:      [new Date().toISOString(), Validators.required]
    });
  }

  /**
   * Registra a nova conta no Firebase.
   */
  registraConta(){
    let conta   = this.contasForm.value;
    const date  = this.contasForm.get('date').value;
    conta       = {...conta, ...DateHelper.breakDate(date)};

    delete conta.date;
    this.conta.registraConta(conta).then(() => this.nav.navigateForward('home'));
  }
}