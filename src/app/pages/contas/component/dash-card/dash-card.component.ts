import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dash-card',
  templateUrl: './dash-card.component.html',
  styleUrls: ['./dash-card.component.scss'],
})
export class DashCardComponent implements OnInit {
  @Input() titulo;
  @Input() icone;
  @Input() cor;
  @Input() tipo;
  @Input() valor;
  @Input() num;

  constructor() { }

  ngOnInit() {
    switch(this.tipo){
      case 'receber': this.receber(); break;
      case 'pagar': this.pagar(); break;
      case 'saldo': this.saldo(); break;
    }
  }

  receber(){
    this.titulo = this.titulo ? this.titulo : 'Contas a receber';
    this.icone = this.icone ? this.icone : 'arrow-up';
    this.cor = this.cor ? this.cor : 'primary';
  }

  pagar(){
    this.titulo = this.titulo ? this.titulo : 'Contas a pagar';
    this.icone = this.icone ? this.icone : 'arrow-down';
    this.cor = this.cor ? this.cor : 'danger';
  }

  saldo(){
    this.titulo = this.titulo ? this.titulo : 'Saldo';
    this.icone = this.icone ? this.icone : 'wallet';
    this.cor = this.cor ? this.cor : 'medium';
  }

}
