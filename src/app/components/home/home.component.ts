import { Component, OnInit } from '@angular/core';
import { PatientsService } from './../patients/patients.service';
import { AuthService } from './../../services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers : [PatientsService, AuthService]
})
export class HomeComponent implements OnInit {
  title = `App works !`;
  patients: Array<any> = [];
  doctor: any = { name : ""};

  constructor(private patientsService: PatientsService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  	this.getPatients();
    this.doctor = this.authService.getDoc();
    if(!this.doctor || !this.doctor._id)
      this.router.navigate(['/login']);
    console.log(this.doctor);
  }

  getPatients(){
		this.patientsService.getPatients().then(result => {
			 console.log('Result', result);
			 this.patients = result.rows;
			},
			error => {
				console.log("Error", error);
			});
	}

}
