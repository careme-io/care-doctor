import PouchDB from 'pouchdb'
// import PouchQuickSearch from 'pouchdb-quick-search'
// PouchDB.plugin(PouchQuickSearch)
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { 
	Router 
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
// import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
// import { catchError, retry } from 'rxjs/operators';

import { Doctor } from './../models/doctor';
import {  DBService } from './db.service';

 

// let localDB = {
//   patients	: 	new PouchDB('patients')
// };
// const formData = new FormData();
//     formData.append('file', file);

//     const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });

const httpOptions = {
	  headers: new HttpHeaders({
	    'enctype': 'multipart/form-data'
	  })
	};
@Injectable()


export class AuthService{

	public token: string;
	private remotePath = "http://159.89.169.255:8000/";
	

	constructor(private http: HttpClient,private router: Router, private dbService: DBService){
		//var loggedDoctor = JSON.parse(localStorage.getItem('thisDoctor'));
		//this.token = loggedDoctor && loggedDoctor.token || 'aabbccdd';
	}	authDoc(creds){
		
		return this.http.post<Doctor>(this.remotePath + 'get_token', creds).subscribe( response => {
			if(response.token) {

				let doc_patients;
				var db = this.dbService;
				var router = this.router;

				localStorage.setItem('authToken', response.token);
				localStorage.setItem('docID', response.email);

				PouchDB.replicate('http://159.89.169.255:5984/userprofile', "doctor", {
                filter: function (doc) {
                    return doc.email === creds.email;
                },
                live: false,
                retry: false,
                
                }).on('complete', function (info) {
                	db.getDoctor().then(doctor => {
	                	console.log(doctor)
	                    doc_patients = doctor.patients;
	                    console.log(doc_patients);

	                    PouchDB.replicate('http://159.89.169.255:5984/patients', "patients", {
	                    doc_ids: doc_patients,
	                    live: false,
	                    retry: false,
	                    
	                    }).on('complete', function (info) {
	                        console.log('patient push complete', info);
	                        router.navigate(['/']);
	                    }).on('error', function (err) {
	                        console.log('error ', err);
	                    });
                	});
                    console.log('doctor push complete', info);
                }).on('error', function (err) {
                    console.log('error ', err);
                });
			}
		});
	}

	authRoute(){
		let token = localStorage.getItem('authToken');
		if(token == null || token == undefined) this.router.navigate(['/login']);
	}
}