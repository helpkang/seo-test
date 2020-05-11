import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataComponent } from './data.component';
import { DataRoutingModule } from './data-routing.module';



@NgModule({
  declarations: [DataComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DataRoutingModule
  ]
})
export class DataModule { }
