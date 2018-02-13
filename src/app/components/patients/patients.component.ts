import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { PatientsService } from './patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  providers : [PatientsService]
})
export class PatientsComponent implements OnInit, AfterViewInit {
	//docID = 101;
	docPro = { id: 101, name: "Dr Mathrabootham"};
	docID;
	query: any;
	showPatientAdd : boolean;
	patients: Array<any>;
	patient: any = null;
	patientText: any = {id: "", text: ""}
	diagnosis: any;
	files: Array<any>;
	selectedDiag: any = "allergies";
	selectedDiagData: Array<any>;
	panelDim: any = {};
	patFiles = [];
	attachment = {};
	attachments: any = [];
	viewAttachment = false;
	selectedImage:any = {};
	public panelHeight;
	@ViewChild('attBtn') attBtn: ElementRef;

	@ViewChild('diagWrapper') diagWrapper;

	constructor(private patientsService: PatientsService) { }

	ngAfterViewInit(){
		//this.setPanelHeight();
	}

	ngOnInit() {
		this.docID = this.docPro.id;

		if(this.patient == undefined) this.patient = {};
		this.getPatients();
		this.setPanelHeight();
		

		//set diagnosis wrapper
		//var diagWrapper = angular.element()
	}
	setPanelHeight(){
		console.log('setting the height');
		var winHeight = window.innerHeight;
		console.log('wh', winHeight);
		this.panelHeight = winHeight - 82;
		this.panelDim.width = this.diagWrapper.nativeElement.clientWidth;
		this.panelDim.height = this.panelHeight;
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
				this.patient._rev = result.rev;
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
			if(result.diagnosis != undefined && result.diagnosis[this.docID]){			
				this.diagnosis = result.diagnosis[this.docID];
				this.selectedDiagData = this.diagnosis[this.selectedDiag];
			}else{
				this.diagnosis = [];
				this.selectedDiagData = [];
			}
			console.log(this.selectedDiagData);
			this.patientText = {date:"", text:""};
			this.attachments = this.patient._attachments;
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
	onDiagChange(){
		this.selectedDiagData = this.diagnosis[this.selectedDiag];
	}
	savePatText(e){
		if(e.date){
			//update the text
			console.log(e);
			var patient = this.patient;
			for(let moment of patient.diagnosis[this.docID][this.selectedDiag]){
				if(moment.date == e.date) moment.text = e.text
			}
			this.patientsService.updatePatient(patient).then(
				result => {
					console.log('updated patients\'s text');
					this.patient._rev = result.rev;
					this.patientText = {date:"", text:""};
				}, error => {
					console.log(error);
				}
			);
		}else{
			//save the text
			var patient = this.patient;
			if(patient.diagnosis == undefined){
				patient.diagnosis = {};
			}
			if(patient.diagnosis[this.docID] == undefined){
				patient.diagnosis[this.docID] = {}
			}
			if(patient.diagnosis[this.docID][this.selectedDiag] == undefined){
				patient.diagnosis[this.docID][this.selectedDiag] = []
			}
			
			patient.diagnosis[this.docID][this.selectedDiag].push({date: new Date, text: e.text});
			
			this.patientsService.updatePatient(patient).then(
				result => {
					console.log('updated patient', result, this.patient);
					this.patient._rev = result.rev;
					this.patientText = {date:"", text:""};
				}, error => {
					console.log(error);
				}
			);
		}
	}

	selectedPatientText(e){
		this.patientText = e;
		console.log('selected ', this.patientText);
	}

	filesSelected($event){
		this.patFiles = $event.target.files;

		var patient:any = Object.assign({}, this.patient);

		if(patient._attachments == undefined)
        	patient._attachments = {};

		for(let i=0; i<this.patFiles.length; i++){
        	let name = this.patFiles[i].name;
        	patient._attachments[name] = {
	          "appID" : 1,
	          "dateTime": new Date(),
	          "content_type" : this.patFiles[i].type,
	          "data" : this.patFiles[i]
	        }
	    }
      
      	this.patientsService.updatePatient(patient).then(
        result => {
          console.log('patient updated');
          this.getPatient(this.patient._id);
        }, error => {
          console.error(error);
        }); 
	}

	addAttachment() {
    	let el: HTMLElement = this.attBtn.nativeElement as HTMLElement;
    	el.click();
	}

	viewAtt(key){
		this.attachment = this.attachments[key];
		this.viewAttachment = true;
	}
	closeAttachment(){
		console.log('got it now closing');
		this.viewAttachment = false;
		this.attachment = {};
	}
	onRemoveAtt(docID, e){
		e.stopPropagation();
		this.patientsService.removeFile(docID, this.patient._id, this.patient._rev).then(
	      result => {
	      	console.log(result);
	      	delete this.attachments[docID];
	        this.patient._rev = result.rev;
	        
	      },
	      error => {
	        console.error(error);
	      }
	    );
	}

	
}
