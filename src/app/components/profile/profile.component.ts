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
	doctor: any;
	docData: any;

  constructor(private authService: AuthService, private dbService: DBService) { }

  ngOnInit() {
	this.doctor = this.authService.getDoc();

	// if(!this.doctor || !this.doctor._id)
	//   this.router.navigate(['/login']);
	this.dbService.getDoctor(this.doctor._id).then(result => {
		this.docData = result;
		console.log(this.doctor);
	})
		
  }

  updateDocData(data){
  	var docData = this.docData;
  	docData[data.key] = data.value;
  //console.log(patient, data);
  	this.dbService.updateDoctor(docData).then(
  		result => {
  			console.log('updated patient');
  			this.docData._rev = result.rev;
  		}, error => {
  			console.log(error);
  		}
  	);
  }

  setProfilePicture($event){
  	let dp = $event.target.files;
  	//console.log(dp);

		var docData:any = Object.assign({}, this.docData);

		if(docData._attachments == undefined)
        	docData._attachments = {};

		//for(let i=0; i<this.patFiles.length; i++){
        	
        	docData._attachments['dp'] = {
	          "dateTime": new Date(),
	          "content_type" : dp[0].type,
	          "data" : dp[0]
	        }
	   // }
      console.log(docData);
      	this.dbService.updateDoctor(docData).then(
        result => {
          console.log('dp updated', result);
          this.docData._rev = result.rev;
        }, error => {
          console.error(error);
        }); 
  }

}
