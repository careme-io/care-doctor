import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DBService } from '../../../services/db.service';

@Component({
  selector: 'patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss'],
  providers: [DBService]
})
export class PatientAddComponent implements OnInit {

	patient : any;
	@Input() docID: string;
	@Output() closePatientAdd = new EventEmitter<{}>();
	@Output() addedPatient = new EventEmitter<{}>();

	constructor(private dbService: DBService) { }

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
		this.dbService.addPatient(patient).then(
	    result => {
	      console.log('patient added', result);
	      this.addedPatient.emit({patID : result.id});
	      //this.dbService.addDocPatient(this.docID, result.rows[0].id)
	    }, error => {
	      console.error(error);
	    });

	}
	addPatientClose(){
	  var patient:any = Object.assign({}, this.patient);
		this.dbService.addPatient(patient).then(
	    result => {
	      console.log('patient added', result);
	      this.addedPatient.emit({patID : result.id});
	      this.closePatientAdd.emit({});
	    }, error => {
	      console.error(error);
	    });
	}


}
