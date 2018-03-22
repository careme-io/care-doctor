import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { DBService } from './../../services/db.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { Doctor } from '../../models/doctor';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  providers : [DBService, AuthService]
})
export class PatientsComponent implements OnInit, AfterViewInit {
	//docID = 101;
	//docPro = { id: 101, name: "Dr Mathrabootham"};
	doctor: Doctor;
	docID;
	docName;
	docData;
	query: any;
	showPatientAdd : boolean;
	patients: Array<any>;
	patient: any = {};
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
	@HostListener('window:resize') onResize() {this.setPanelHeight()}
	constructor(private dbService: DBService, private authService: AuthService, private router: Router) { }

	ngAfterViewInit(){
		//this.setPanelHeight();
	}

	ngOnInit() {
		
		//this.authService.authRoute();
		this.dbService.getDoctor().then(response => {
			console.log(response);
			this.doctor = response;
			this.docName = this.doctor.doctor_name;
			this.getPatients();
			this.setPanelHeight();
			
		}).catch(err=>{console.log(err)});
		
		this.docID = localStorage.getItem('docID')
		

		// if(this.patient == undefined) this.patient = {};
		

		//set diagnosis wrapper
		//var diagWrapper = angular.element()
	}
	setPanelHeight(){
		console.log('setting the height');
		var winHeight = window.innerHeight;
		console.log('wh', winHeight);
		this.panelHeight = winHeight - 82;
		this.panelDim = {};
		this.panelDim.width = this.diagWrapper.nativeElement.clientWidth;
		this.panelDim.height = this.panelHeight;
	}
	// addNewPatient(){
	// 	this.patient = {};
	// 	this.togglePatientAdd();
	// }
	addDocPatient(pat){
		
		this.doctor.patients ? this.doctor.patients.push(pat.patID) : this.doctor.patients = [pat.patID];
		console.log(this.doctor);
		this.dbService.updateDoctor(this.doctor).then(
			result => {
				this.dbService.getDoctor().then(response => {
					this.doctor = response;
					this.getPatients();
				});
				
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
				this.dbService.pushDB();
				this.patient._rev = result.rev;
				this.getPatients();
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
			let allAttachments = this.patient._attachments;
			
			// Object.keys(this.attachments).map(function(key, index) {
			   
			// });
			this.attachments = {};
			for(let key in allAttachments) {
			    if(allAttachments.hasOwnProperty(key)) {
			    	if(key.indexOf(this.docID) >= 0){
			        	let label = key.replace(this.docID, '');
			        	//console.log('value is ', allAttachments[key]);
			        	this.attachments[label] = allAttachments[key];
			        }
			    }
			}
			console.log(this.attachments);

			// this.attachments.forEach( att => {
			// 	console.log(att)''
			// })
			// console.log(this.attachments);
			// this.filteredAttachments = this.attachments.filter(att => {
			// 	console.log("filtering ", att);
			// });
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
					this.getPatient(this.patient._id);
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
        	let name = this.docID + this.patFiles[i].name;
        	patient._attachments[name] = {
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
	onRemoveAtt(attID, e){
		e.stopPropagation();
		this.dbService.removePatientFile(this.docID + attID, this.patient._id, this.patient._rev).then(
	      result => {
	      	console.log(result);
	      	delete this.attachments[attID];
	        this.patient._rev = result.rev;
	        
	      },
	      error => {
	        console.error(error);
	      }
	    );
	}

	
}
