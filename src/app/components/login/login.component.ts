import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { DBService } from './../../services/db.service';
//import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../../models/doctor'
import { NgForm } from '@angular/forms';


//@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [DBService, AuthService]
})
export class LoginComponent implements OnInit {

  // doctor: Doctor;
  // creds;

  constructor(private dbService: DBService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    
  }

  login(sForm: NgForm){
       this.authService.authDoc({email: sForm.value.email, password: sForm.value.password});	
  }

}
