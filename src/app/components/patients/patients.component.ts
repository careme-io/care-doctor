import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { DBService } from './../../services/db.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  providers : [DBService, AuthService]
})
export class PatientsComponent implements OnInit, AfterViewInit {
	//docID = 101;
	//docPro = { id: 101, name: "Dr Mathrabootham"};
	doctor: any;
	docID;
	docData;
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

	constructor(private dbService: DBService, private authService: AuthService, private router: Router) { }

	ngAfterViewInit(){
		//this.setPanelHeight();
	}

	ngOnInit() {
		

		this.doctor = this.authService.getDoc();
		if(!this.doctor || !this.doctor._id)
		  this.router.navigate(['/login']);

		this.docID = this.doctor._id;

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
	// addNewPatient(){
	// 	this.patient = {};
	// 	this.togglePatientAdd();
	// }
	addDocPatient(pat){
		
		this.docData.patients ? this.docData.patients.push(pat.patID) : this.docData.patients = [pat.patID];
		console.log(this.doctor);
		this.dbService.updateDoctor(this.docData).then(
			result => {
				this.doctor._rev = result.rev;
				this.getPatients();
			});
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
		this.dbService.updatePatient(patient).then(
			result => {
				console.log('updated patient');
				this.patient._rev = result.rev;
			}, error => {
				console.log(error);
			}
		);
	}

	searchPatients(e){
		this.dbService.searchPatient(e.target.value).then(
			result => {
				console.log(result);
			}, error => {
				console.log(error);
			});
	}
	getPatient(id){
		this.dbService.getPatient(id).then(result =>{
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
		console.log(this.doctor);
		this.dbService.getDoctor(this.docID).then(result => {
			this.docData = result;
			this.dbService.getPatients().then(result => {
				let allPatients = result.rows;
				this.patients = allPatients.filter(pat => {
					var ind = this.docData.patients.indexOf(pat.id)
				 	if(ind >= 0){
				 		return true;
				 	}else{
				 		return false;
				 	}
				})
			})
		})
		//let allPatients = this.db
		// this.dbService.getPatients().then(result => {
		// 	 console.log('Result', result);
		// 	 let allpatients = result.rows;
		// 	 console.log(this.doctor.patients);
		// 	 this.patients = allpatients.filter(pat => {
		// 	 	console.log(pat._id);
		// 	 	return this.doctor.patients.indexOf(pat._id);
		// 	 });
		// 	 //this.patients = result.rows;
		// 	},
		// 	error => {
		// 		console.log("Error", error);
		// 	});
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
			this.dbService.updatePatient(patient).then(
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
			
			this.dbService.updatePatient(patient).then(
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
      
      	this.dbService.updatePatient(patient).then(
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
		this.dbService.removePatientFile(docID, this.patient._id, this.patient._rev).then(
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
