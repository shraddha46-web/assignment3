import { Component, OnInit } from '@angular/core';
import { TestdataService } from '../common/testdata.service';
import { ActivatedRoute, Router, Route } from '@angular/router'
@Component({
  selector: 'app-emplist',
  templateUrl: './emplist.component.html',
  styleUrls: ['./emplist.component.css']
})
export class EmplistComponent implements OnInit {

  constructor(private testdata: TestdataService, private route: ActivatedRoute,
    private router: Router) { }
  showEmpList;
  empList;
  dataSource;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  columns = [];
  ngOnInit(): void {

    this.testdata.dataSource.getValue().subscribe(res => {

      console.log(res);
      this.columns = ['Id', 'Name', 'Phone Number'];
      this.showEmpList = res;
      this.empList = res;
      //dataSource = res;
      //dataSource = ELEMENT_DATA;
    });
  }

  deleteEmp(empId) {
    var r = confirm("Do you want delete Emp");
    if (r == true) {
      var list = this.empList;
      this.testdata.deletePost(empId).subscribe(res => {
        this.empList.some(function (element, index, array) {
          if (element.id == empId) {
            list.splice(index, 1)
          //  delete list[index];
            this.showEmpList = list;
          }
          return element.id == empId;//empRecord['id'];
        });
       
        

      })
    }
  }


  addEmp() {
    // this.router.navigate(['/edit', { id: '' }]);
    this.router.navigate(['/add-emp']);
  }

}
