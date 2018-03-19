import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'
import PouchQuickSearch from 'pouchdb-quick-search'
PouchDB.plugin(PouchQuickSearch)
PouchDB.plugin(PouchFind)

import { Doctor } from '../models/doctor';

let remotePath = "http://159.89.169.255:8000/";

let localDB = {
  doctor	: 	new PouchDB('doctor'),
  patients	: 	new PouchDB('patients')
};


export class DBService {

	/*** Sync  ***/
	/***************/

	pushDB(){
		PouchDB.replicate('patients', "http://159.89.169.255:5984/patients", {
			live: false,
			retry: false
		}).on('complete', function (info) {
			  console.log('push complete', info)
		}).on('error', function (err) {
			  console.log('error ', err);
		});
		
		PouchDB.replicate('doctor', "http://159.89.169.255:5984/userprofile", {
			live: false,
			retry: false,
		}).on('complete', function (info) {
			  console.log('push complete', info);
		}).on('error', function (err) {
			  console.log('error ', err);
		});
	}

	pullDB(doc_patients){
		//let doc_patients;
		

	        PouchDB.replicate('http://159.89.169.255:5984/patients', "patients", {
	        doc_ids: doc_patients,
	        live: false,
	        retry: false,
	        
	        }).on('complete', function (info) {
	            console.log('patient pull complete', info);
	        }).on('error', function (err) {
	            console.log('error ', err);
	        });
	}

	syncDB(){
		console.log("Sync db call");
	}

	/*** Doctor  ***/
	/***************/
	getDoctors(){
		return localDB.doctor.allDocs({ include_docs: true });
	}
	getDoctor(): Promise<Doctor>{
		let docID = localStorage.getItem('docID');
		let doctor = localDB.doctor.get(docID);
		console.log('frm pouch doc', doctor)
		return doctor;
	}
	getDocFrmEmail(data){
		return localDB.doctor.find({
		  selector: {email: data}	
		})
	}
	addDoctor(doc){
		if(doc.email){			
			doc._id = doc.email;
			return localDB.doctor.put(doc);
		}
	}
	updateDoctor(doc){
		console.log(doc);
		return localDB.doctor.put(doc)
	}
	// addDocPatient(doc){
	// 	return localDB.doctor.put(doc);
	// }

	/*** Patient. ***/
	/****************/

	getPatients(){

		return localDB.patients.allDocs({ include_docs: true });
	}
	getPatient(id){
		var patient = localDB.patients.get(id, {attachments: true});
		return patient;
	}
	addPatient(patient){			
		patient._id = patient.phone;
		return localDB.patients.put(patient);
	}
	removePatientFile(attID, patID, rev){
		return localDB.patients.removeAttachment(patID, attID, rev);
	}
	updatePatient(patient){
		return localDB.patients.put(patient)
	}
	searchPatient(keyword){
		if(keyword.length > 0){
			return localDB.patients.search({
			    query: keyword,
			    fields: ['name', 'phone', 'city'],
			    mm: '0%',
			    include_docs: true,
			    highlighting: true
			  });
		}
	}
}