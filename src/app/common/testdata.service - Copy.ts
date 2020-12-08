import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, BehaviorSubject, onErrorResumeNext } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, retry } from 'rxjs/operators'
import { Observable, of , throwError } from 'rxjs';
import { ObservableStore } from '@codewithdan/observable-store';
@Injectable({
  providedIn: 'root'
})

export interface StoreState {
  employees: {};
  employee:[]  
}
export class TestdataService extends ObservableStore<StoreState>  {
  public base_url: any;
  public dataSource;
  
  public orignalEmpList: any;
  public data;
  public empList;
  constructor(private http: HttpClient) {
    super({ trackStateHistory: true });
    this.base_url = environment.base_url;
    this.empList = this.http.get<any>(this.base_url + 'users');
    this.dataSource = new BehaviorSubject(this.empList);
    this.dataSource = this.dataSource.asObservable();

    const initialState = {
      employees: this.empList,
      employee: null
  }
    this.setState(initialState , 'INIT_STATE');

  }


  //public userlist = new BehaviorSubject<any>('');
  getEmpList() {
    // var empList = this.http.get<any>(this.base_url + 'users');
    // this.dataSource = new BehaviorSubject(empList);
    // this.dataSource.subscribe((data) => {
    //return this.dataSource.value;
    // return this.dataSource.getValue().pipe(
    //   retry(2),
    //   catchError(this.handleError)
    // );
  

    const employees = this.getState().employees;
    if (employees) {
        return of(employees);
    }
    else {
        // call server and get data
        // assume async call here that returns observable
        //return asyncData;
    }

  }

  
  add(employee) {
    let state = this.getState();
    state.employees.push(employee);
    this.setState({ employees: state.employees }, 'ADD_CUSTOMER');
}

remove() {
    let state = this.getState();
    state.employees.splice(state.employees.length - 1, 1);
    this.setState({ employees: state.employees }, 'REMOVE_CUSTOMER');
}
  getSingleEmp(id) {
    return this.http.get<any>(this.base_url + 'users/' + id).pipe(
      catchError(this.handleError)
    );;
  }
  deletePost(id) {
    return this.http.delete<any>(this.base_url + "users/" + id).pipe(
      catchError(this.handleError)
    );;
  }

  addEmp(record) {
    return this.http.post<any>(this.base_url + "users", record).pipe(
      catchError(this.handleError)
    );;

  }
  //dont know how it can be updated
  // updateEmp(id, record) {
  //   return this.http.post<any>(this.base_url + "users/" + id, record);
  // }

  updateEmp(records) {
    this.dataSource.next(records);

    //dont know how it can be updated
    // this.dataSource.next(records).pipe(
    //   catchError(this.handleError)
    // );
    // return this.dataSource.asObservable();
    //return this.http.post<any>(this.base_url + "users/" + id, record);
  }
  handleError(error: HttpErrorResponse) {
    console.log("Error");
    return throwError(error);
  }
} 
