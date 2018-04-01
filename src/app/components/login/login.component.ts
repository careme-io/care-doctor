import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { DBService } from './../../services/db.service';
//import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../../models/doctor';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
  errorMessage: String = '';
  showError: boolean = false;
  loggingIn:boolean = false;
  loginForm: FormGroup;
  loading:boolean = true;

  constructor(
    private dbService: DBService, private authService: AuthService, 
    private router: Router, private fb: FormBuilder,
    public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.createForm();
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    
  }

  createForm(){
    this.loginForm = this.fb.group({
          email: ['', [Validators.required, Validators.email] ],
          password: ['', [Validators.required] ]
    });
  }

  login(){
      this.loading = true;
      //console.log(this.loginForm.value);
      this.authService.authDoc(this.loginForm.value).subscribe(response => {},
        err => {
          console.log(err);
          this.loading = false;
          if(err.status == 403){
            this.errorMessage = "Inavlid credentials. Try again.";
            this.toastr.error('Invalid credentials!');
          }
          else{
            this.errorMessage = "Cannot connect server. Check your internet Connection."
          }
          setTimeout(()=>{
              this.errorMessage = "";
          }, 3000);
        }
      );
  }

}
