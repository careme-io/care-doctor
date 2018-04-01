import { Component, OnInit } from '@angular/core';
import { DBService } from './../../services/db.service';
import { AuthService } from './../../services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers : [DBService, AuthService]
})
export class HomeComponent implements OnInit {
  title = 'Careme';
  patients: Array<any> = [];
  doctor: any = { name : ""};
  docID;
  docName;

  constructor(private dbService: DBService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.docID = localStorage.getItem('docID')
    this.docName = localStorage.getItem('docName');
    this.getPatients();

  }

  
  getPatients(){
    this.dbService.getDocPatients(this.docID).subscribe(patients => {this.patients = patients});
  }

}
