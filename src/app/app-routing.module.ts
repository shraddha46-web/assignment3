import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from '../app/add-employee/add-employee.component'
import { EmplistComponent } from '../app/emplist/emplist.component';
import { PageNotFoundComponent } from '../app/page-not-found/page-not-found.component'
const routes: Routes = [
  
  { path: 'add-emp/:id', component: AddEmployeeComponent },
  { path: 'show-emplist', component: EmplistComponent },
  { path: '', redirectTo:'show-emplist', pathMatch:'full' },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
