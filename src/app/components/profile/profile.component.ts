import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { DBService } from './../../services/db.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [AuthService, DBService]
})
export class ProfileComponent implements OnInit {
	doctor: any = {};
	docID: any;
  docName;

  constructor(private authService: AuthService, private dbService: DBService) { }

  ngOnInit() {
	//this.doctor = this.authService.getDoc();

	// if(!this.doctor || !this.doctor._id)
	//   this.router.navigate(['/login']);
	// this.dbService.getDoctor(this.doctor._id).then(result => {
	// 	this.docData = result;
	// 	console.log(this.doctor);
	// })

  this.dbService.getDoctor().then(response => {
    console.log(response);
    this.doctor = response;
    this.docName = this.doctor.doctor_name;
    
  }).catch(err=>{console.log(err)});
  
  this.docID = localStorage.getItem('docID')
		
  }

  updateDocData(data){
  	var docData = this.doctor;
  	docData[data.key] = data.value;
   console.log('doctor', docData);
  	this.dbService.updateDoctor(docData).then(
  		result => {
  			this.doctor._rev = result.rev;
        this.dbService.pushDB();
  		}, error => {
  			console.log(error);
  		}
  	);
  }

  // setProfilePicture($event){
  // 	let dp = $event.target.files;
  // 	//console.log(dp);

		// var docData:any = Object.assign({}, this.doctor);

		// if(docData._attachments == undefined)
  //       	docData._attachments = {};

		// //for(let i=0; i<this.patFiles.length; i++){
        	
  //       	docData._attachments['dp'] = {
	 //          "content_type" : dp[0].type,
	 //          "data" : dp[0]
	 //        }
	 //   // }
  //     console.log(docData);
  //     	this.dbService.updateDoctor(docData).then(
  //       result => {
  //         console.log('dp updated', result);
  //         this.dbService.getDoctor().then(response => {
  //           console.log(response);
  //           this.doctor = response;
  //           this.docName = this.doctor.doctor_name;
            
  //         }).catch(err=>{console.log(err)});
  //       }, error => {
  //         console.error(error);
  //       }); 
  // }

}
