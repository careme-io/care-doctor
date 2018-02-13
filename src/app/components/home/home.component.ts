import { Component, OnInit } from '@angular/core';
import { PatientsService } from './../patients/patients.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers : [PatientsService]
})
export class HomeComponent implements OnInit {
  title = `App works !`;
  patients: Array<any>;

  constructor(private patientsService: PatientsService) { }

  ngOnInit() {
  	this.getPatients();
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
