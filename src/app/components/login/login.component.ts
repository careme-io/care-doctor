import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { DBService } from './../../services/db.service';
//import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [DBService, AuthService]
})
export class LoginComponent implements OnInit {

	doctor: any= {};


  constructor(private dbService: DBService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(){
  	//let token = this.authService.getToken();
  	//let doctor = this.doctorsService.login(doctor.name);
  	this.dbService.getDocFrmEmail(this.doctor.email).then(result=>{
  		let docData = result.docs[0];
  		console.log(result);
  		if(docData && docData._id){
  			this.authService.setDoc(docData);
  			this.router.navigate(['/']);
  		}else{
  			alert('doc not found');
  		}
  	})
  	
  }

}
