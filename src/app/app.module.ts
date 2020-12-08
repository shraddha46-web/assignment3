import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyInputComponent } from './my-input/my-input.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { EmplistComponent } from './emplist/emplist.component';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    MyInputComponent,
    AddEmployeeComponent,
    EmplistComponent,
    PageNotFoundComponent
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    HttpClientModule,
    NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
