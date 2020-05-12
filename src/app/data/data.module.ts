import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataComponent } from './data.component';
import { DataRoutingModule } from './data-routing.module';



@NgModule({
  declarations: [DataComponent],
  imports: [
    CommonModule,
    DataRoutingModule
  ],
  exports: [
  ]
})
export class DataModule { }
