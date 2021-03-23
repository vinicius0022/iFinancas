import { Component } from '@angular/core';
import { LoginService } from '../auth/service/login.service';
import { ContaService } from '../contas/service/conta-service';
  
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  date = new Date().toISOString();
  
  conta = {
    pagar: {num: 0, valor: 0},
    receber: {num: 0, valor: 0},
    saldo: {num: 0, valor: 0}
  }

  constructor(
    private service: LoginService,
    private contas: ContaService
  ) {}

  ionViewWillEnter() {
    this.atualizaContas();
  }

  atualizaContas() {
    this.contas.total('pagar', this.date).subscribe(
      (x: any) => {
        this.conta.pagar = x;
        this.contas.total('receber', this.date).subscribe(
          (y: any) => {
            this.conta.receber = y
            this.atualizaSaldo();
          }
        );
      }
    );
  }

  atualizaSaldo() {
    this.conta.saldo.num = this.conta.pagar.num + this.conta.receber.num
    this.conta.saldo.valor = this.conta.receber.valor - this.conta.pagar.valor
  }

  logout() {
    this.service.logout();
  }

}
