import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss'],
  providers: [PatientsService]
})
export class PatientAddComponent implements OnInit {

	patient : any;
	@Output() closePatientAdd = new EventEmitter<{}>();

	constructor(private patientsService: PatientsService) { }

	ngOnInit() {
		if(this.patient == undefined) this.patient = {};
	}

	closePatientAddForm(){
		console.log('going to emit close');
		this.closePatientAdd.emit({});
	}

	addPatient(){
	  // console.log('patient', this.patient);
	  var patient:any = Object.assign({}, this.patient);
		this.patientsService.addPatient(patient).then(
	    result => {
	      console.log('patient added');
	    }, error => {
	      console.error(error);
	    });

	}
	addPatientClose(){
	  var patient:any = Object.assign({}, this.patient);
		this.patientsService.addPatient(patient).then(
	    result => {
	      console.log('patient added');
	      this.closePatientAdd.emit({});
	    }, error => {
	      console.error(error);
	    });
	}


}
