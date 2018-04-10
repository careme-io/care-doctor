import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DBService } from '../../../services/db.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';

import { Observable } from 'rxjs/Observable';

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
	cpForm: FormGroup;

	constructor(private dbService: DBService, private fb: FormBuilder, private mapil: MapsAPILoader) {
		this.createForm();
	}
	createForm(){
	  this.cpForm = this.fb.group({
	        name: ['', Validators.required],
	        phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)] ],
	        email: [''],
	        age: [''],
	        city: ['', Validators.required]
	  });
	}

	ngOnInit() {}
	closePatientAddForm(){
		console.log('going to emit close');
		this.closePatientAdd.emit({});
	}

	// addPatient(newPat: NgForm){
	//   // console.log('patient', this.patient);
	//   var patient:any = Object.assign({}, newPat.value);
	//   patient.lat = 0;
	//   patient.long = 0;
	//   console.log(patient);
	// 	this.dbService.addPatient(patient).then(
	//     result => {
	//       console.log('patient added', result);
	//       this.addedPatient.emit({patID : result.id});
	//       //this.dbService.addDocPatient(this.docID, result.rows[0].id)
	//     }, error => {
	//       console.error(error);
	//     });

	// }
	addPatientClose(){
		var patient:any = Object.assign({}, this.cpForm.value);
		var coords = {lat: 0, lon: 0};
		let patID;
		this.dbService.addPatient(patient).then(
	    result => {
	    	this.closePatientAdd.emit({});	
	    	this.cpForm.reset();
	      console.log('patient added', result);
	      patID = result.id;
		  this.addedPatient.emit({patID : patID});
	    }, error => {
	      console.error(error);
	    });

		//const getCoords = Observable.create((handle)=>{
		  	
		  	if(navigator.onLine){
		  		this.mapil.load().then(()=>{
		  				console.log('maps loaded')
		  			  	var geocoder = new google.maps.Geocoder();
		  			  	geocoder.geocode({ 'address': patient.city },(results, status) => {
		  			  		if(status == google.maps.GeocoderStatus.OK){
			  			    	if (results[0] == undefined || results[0] == null) {
			  			        	return;
			  			      	}
			  			    	coords.lat = results[0].geometry.location.lat();
			  			    	coords.lon = results[0].geometry.location.lng();

			  			    	this.dbService.getPatient(patID).then(result =>{
			  			    		let patient = result;
			  			    		patient.lat = coords.lat;
			  			    		patient.lon = coords.lon;
			  			    		this.dbService.updatePatient(patient).then(
			  			    			result => {
			  			    				this.dbService.pushDB();
			  			    			}, error => {
			  			    				console.log(error);
			  			    			}
			  			    		);
			  			    	});
			  			  	}
		  				});
		  		})
		  	}
		//});

		// this.closePatientAdd.emit({});
		// getCoords.subscribe(coords=>{
		// 	patient.lat = coords.lat;
		// 	patient.lon = coords.lon;
			
		// });
	  
  		// this.dbService.addPatient(patient).then(
  	 //    result => {
  	 //      console.log('patient added', result);
  	 //      this.addedPatient.emit({patID : result.id});
  	 //      this.closePatientAdd.emit({});
  	 //    }, error => {
  	 //      console.error(error);
  	 //    });
	  

	}

	getCoords(address){
		// return this.mapil.load().then(() => {
		//   	var geocoder = new google.maps.Geocoder();
		//   	geocoder.geocode({ 'address': address },(results, status) => {
		//     	if (results[0] == undefined || results[0] == null) {
		//         	return;
		//       	}
		//     	this.lat = results[0].geometry.location.lat();
		//     	this.lng = results[0].geometry.location.lng();
		  
		// 	});
		//});
	}


}
