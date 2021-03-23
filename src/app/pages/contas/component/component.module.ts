import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashCardComponent } from './dash-card/dash-card.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    DashCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    DashCardComponent
  ]
})
export class ComponentModule { }
