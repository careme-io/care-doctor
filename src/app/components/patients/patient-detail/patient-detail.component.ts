import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss'],
  providers : [PatientsService]
})
export class PatientDetailComponent implements OnInit {

	@Input() patient : any;
  @Input() diag : any;
  @Input() files: any;
  @Output() closePatientDetails = new EventEmitter<{}>();
  fileImg: any = {};
  patFiles = [];
  constructor(private patientsService: PatientsService) { }

  ngOnInit() {
    if(this.patient == undefined)
       this.patient = {};
    if(this.diag == undefined)
       this.diag = {};
    if(this.files == undefined)
       this.files = [];
  }

  closePatientMenu(){
    this.closePatientDetails.emit({});
  }

  filesSelected($event) : void {
    console.log($event.target);
    this.patFiles = $event.target.files;
  }

  removeFile(docID, index) {
    console.log('old', this.patient._rev);
    console.log(docID, this.patient._id, this.patient._rev)
    this.patientsService.removeFile(docID, this.patient._id, this.patient._rev).then(
      result => {
        this.patient._rev = result.rev;
        console.log()
      },
      error => {
        console.error(error);
      }
    );
    
    delete this.patient._attachments.docID;
    this.files.splice(index, 1);
  }

  showFile(file){
    this.fileImg = {};
    this.fileImg.name = file.id;
    this.fileImg.src = 'data:image/png;base64,' + file.data;
    document.getElementById('triggerfileBig').click();
  }

  addPatient(){
    console.log('patient', this.patient);
    console.log('diag', this.diag);
    console.log('files', this.patFiles);
    //var files = this.patFiles;
    var patient:any = Object.assign({}, this.patient);
    patient.diagnosis = [];
    patient.diagnosis.push(this.diag);
    patient._attachments = {};
    for(let i=0; i<this.patFiles.length; i++){
      let name = this.patFiles[i].name;
      patient._attachments[name] = {
        "appID" : 1,
        "content_type" : this.patFiles[i].type,
        "data" : this.patFiles[i]
      }
    }
  	this.patientsService.addPatient(patient).then(
      result => {
        console.log('patient added');
        this.closePatientDetails.emit({});
      }, error => {
        console.error(error);
      });
  }
  updatePatient(){
      var patient:any = Object.assign({}, this.patient);
      patient.diagnosis = [];
      patient.diagnosis.push(this.diag);
      if(patient._attachments == undefined)
        patient._attachments = {};
      for(let i=0; i<this.patFiles.length; i++){
        let name = this.patFiles[i].name;
        patient._attachments[name] = {
          "appID" : 1,
          "content_type" : this.patFiles[i].type,
          "data" : this.patFiles[i]
        }
      }
      console.log(patient);
      this.patientsService.updatePatient(patient).then(
        result => {
          console.log('patient updated');
          this.closePatientDetails.emit({});
        }, error => {
          console.error(error);
        }); 
  }
}
