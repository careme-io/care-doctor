import { Component, OnInit } from '@angular/core';
import { DBService } from './../../services/db.service';
import { AuthService } from './../../services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers : [DBService, AuthService]
})
export class HomeComponent implements OnInit {
  title = `App works !`;
  patients: Array<any> = [];
  doctor: any = { name : ""};
  docID;

  constructor(private dbService: DBService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  	// this.getPatients();
   //  this.doctor = this.authService.getDoc();
   //  if(!this.doctor || !this.doctor._id)
   //    this.router.navigate(['/login']);
   //  console.log(this.doctor);
   //this.authService.authRoute();
    this.dbService.getDoctor().then(response => {
      console.log(response);
      this.doctor = response;
      this.getPatients();
    }).catch(err=>{console.log(err)});
    
    this.docID = localStorage.getItem('docID')

  }

  
  getPatients(){
    this.dbService.getPatients().then(result => {
      console.log('got patients', result.rows)
      let allPatients = result.rows;
      this.patients = allPatients.filter(pat => {
        if(this.doctor && this.doctor.patients != undefined){
          var ind = this.doctor.patients.indexOf(pat.id)
           if(ind >= 0){
             return true;
           }else{
             return false;
           }
        }
      })
    });
    
  }

}
