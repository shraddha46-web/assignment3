import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, onErrorResumeNext } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TestdataService {
  public base_url: any;
  public dataSource;
  public orignalEmpList: any;
  public data;
  public empList;
  constructor(private http: HttpClient) {
    this.base_url = environment.base_url;
    this.empList = this.http.get<any>(this.base_url + 'users');
    this.dataSource = new BehaviorSubject(this.empList);
    this.dataSource.asObservable();

  }
  getEmpList() {
    // var empList = this.http.get<any>(this.base_url + 'users');
    // this.dataSource = new BehaviorSubject(empList);
    // this.dataSource.subscribe((data) => {
    //return this.dataSource.value;
    return this.dataSource.getValue();
  }

  getSingleEmp(id) {
    return this.http.get<any>(this.base_url + 'users/' + id);
  }
  deletePost(id) {
    return this.http.delete<any>(this.base_url + "users/" + id);
  }

  addEmp(record) {
    return this.http.post<any>(this.base_url + "users", record);

  }
  //dont know how it can be updated
  // updateEmp(id, record) {
  //   return this.http.post<any>(this.base_url + "users/" + id, record);
  // }

  updateEmp(records) {
    console.log("Upadted record");
    console.log(records);
    this.dataSource.next(records);

  }
} 
