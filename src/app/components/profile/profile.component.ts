import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { DBService } from './../../services/db.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [AuthService, DBService]
})
export class ProfileComponent implements OnInit {
	doctor: any = {};
	docID: any;
  docName;

  constructor(private authService: AuthService, private dbService: DBService) { }

  ngOnInit() {


  
  this.docID = localStorage.getItem('docID')
  this.docName = localStorage.getItem('docName');

  this.dbService.getDoctor().then(doctor => {
    this.doctor = doctor;
  }).catch(err=>{console.log(err)});
		
  }

  updateDocData(data){
  	var docData = this.doctor;
  	docData[data.key] = data.value;
   console.log('doctor', docData);
  	this.dbService.updateDoctor(docData).then(
  		result => {
  			//this.doctor._rev = result.rev;
        this.dbService.pushDB();

        this.dbService.getDoctor().then(response => {
          console.log(response);
          this.doctor = response;
          this.docName = this.doctor.doctor_name;
          
        }).catch(err=>{console.log(err)});
  		}, error => {
  			console.log(error);
  		}
  	);
  }


}
