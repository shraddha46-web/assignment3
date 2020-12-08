import { Component, OnInit ,OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TestdataService } from '../common/testdata.service';
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit,OnDestroy  {

  employeeForm: FormGroup;
  empId;
  empRecord;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private testdata: TestdataService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    // this.employeeForm = this.formBuilder.group({
    //   name: ['', this.NaSpace],
    // });

    this.employeeForm = this.formBuilder.group({
      id: ['', this.NaSpace],
      name: ['', [Validators.required, this.NaSpace]],
      username: ['', [Validators.required, this.NaSpace]],
      email: ['', [Validators.required, Validators.required, Validators.maxLength(50), Validators.required, Validators.minLength(10), this.NaSpace]],
      address: this.formBuilder.group({
        street: ['', this.NaSpace],
        suite: ['', this.NaSpace],
        city: ['', this.NaSpace],
        zipcode: ['', this.NaSpace],
        geo: this.formBuilder.group({
          lat: ['', this.NaSpace],
          lng: ['', this.NaSpace]
        })
      }),
      phone: [''],
      website: [''],
      company: this.formBuilder.group({
        name: [''],
        catchPhrase: [''],
        bs: ['']
      })
    });

    this.empId = this.route.snapshot.paramMap.get('id');

    console.log(this.empId);
    if (this.empId) {
      this.getSingleRecord(this.empId);
    }
  }


  getSingleRecord(id) {
    this.testdata.getSingleEmp(id).subscribe(res => {
      console.log(res);
      this.employeeForm.setValue(res);
    });
  }


  get f() { return this.employeeForm.controls; }

  updateList(allLists) {

    this.testdata.updateEmp(allLists);

  }

  save() {
    console.log(this.employeeForm.value);


    this.submitted = true;

    // stop here if form is invalid
    if (this.employeeForm.invalid) {
      return;
    }

    // display form values on success
    var empRecord = (this.employeeForm.value);
    if (this.empId || this.employeeForm.value.id) {
      var empId = empRecord.id;
      var allLists = [];
      //this.testdata.getEmpList().subscribe(res => {
      this.testdata.dataSource.getValue().subscribe(res => {
        allLists = res;
        allLists.some(function (element, index, array) {
          if (element.id == empId) {
            allLists[index] = empRecord;
          }
          return element.id == empId;//empRecord['id'];
        });
        this.updateList(allLists);
      });

    } else {
      this.empRecord = JSON.stringify(empRecord);
      delete this.empRecord.id;
      this.testdata.addEmp(this.empRecord).subscribe(res => {
        console.log(res);
      });

    }

  }

  // Custom Validator
  NaSpace(control: FormControl) {
    if (control.value == " ") {
      return { 'spaceNotAllowed': true };
    }
    return null;
  }
  OnlyNumber(control: FormControl) {
    // if (control.value == " ") {
    //   return { 'spaceNotAllowed': true };
    // }
    // return null;

    //   var reg = '/^\d+$/';//new RegExp('/^\d+$/');
    // console.log(reg.test(reg));

  }
  OnlyText(control: FormControl) {
    // if (control.value == " ") {
    //   return { 'spaceNotAllowed': true };
    // }
    // return null;
  }
  onReset() {
    this.employeeForm.reset();
    
  } 

  ngOnDestroy() {
 //   this.testdata.unsubscribe()
}
}
