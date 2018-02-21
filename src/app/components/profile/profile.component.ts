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
	})
		
  }

  updateDoctorData(data){
  	var docData = this.docData;
  	docData[data.key] = data.value;
  	//console.log(patient, data);
  	this.dbService.updateDoctor(docData).then(
  		result => {
  			console.log('updated patient');
  			this.doctor._rev = result.rev;
  		}, error => {
  			console.log(error);
  		}
  	);
  }

}
