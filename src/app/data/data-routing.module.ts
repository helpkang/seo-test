import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataComponent } from './data.component';

//cheap-flights-from-los-angeles-to-seoul-incheon-lax-icn
const routes: Routes = [
  { path: '', component: DataComponent},
  // { path: ':from/:to', component: DataComponent},
  { path: ':fromto', component: DataComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }
