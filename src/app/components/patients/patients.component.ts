import { Component, OnInit } from '@angular/core';
import { PatientsService } from './patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  providers : [PatientsService]
})
export class PatientsComponent implements OnInit {
	query: any;
	showPatientAdd : boolean;
	patients: Array<any>;
	patient: any = null;
	diagnosis: any;
	files: Array<any>;

	constructor(private patientsService: PatientsService) { }

	ngOnInit() {
		if(this.patient == undefined) this.patient = {};
		this.getPatients();
	}
	addNewPatient(){
		this.patient = {};
		this.togglePatientAdd();
	}
	closePatientDetails({}){
		this.patient = {};
		this.showPatientAdd = false;
	}
    togglePatientAdd(){
  		this.showPatientAdd = !this.showPatientAdd;
	}
    closePatientAdd(){
    	console.log('received close signal');
  		this.showPatientAdd = false;
  		this.getPatients();
	}
	updatePatientData(data){
		var patient = this.patient;
		patient[data.key] = data.value;
		console.log(patient, data);
		this.patientsService.updatePatient(patient).then(
			result => {
				console.log('updated patient');
			}, error => {
				console.log(error);
			}
		);
	}
	searchPatients(e){
		this.patientsService.searchPatient(e.target.value).then(
			result => {
				console.log(result);
			}, error => {
				console.log(error);
			});
	}
	getPatient(id){
		this.patientsService.getPatient(id).then(result =>{
			console.log(result);
			this.patient = result;			
			this.diagnosis = {};
			// this.diagnosis.history = result.diagnosis[0].history;
			// this.diagnosis.comments = result.diagnosis[0].comments;
			// this.diagnosis.allergies = result.diagnosis[0].allergies;
			// delete this.patient.diagnosis;
			// this.files = [];
			// for(let key in result._attachments){
			// 	result._attachments[key].id = key;
			// 	this.files.push(result._attachments[key]);
			// }
			// console.log(this.files);
			//delete this.patient._attachments;
			//this.showPatientAdd = true;
		},
		error =>{
			console.log('Error', error);
		})
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
