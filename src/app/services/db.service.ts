import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'
import PouchQuickSearch from 'pouchdb-quick-search'
PouchDB.plugin(PouchQuickSearch)
PouchDB.plugin(PouchFind)


let localDB = {
  doctors	: 	new PouchDB('doctors'),
  patients	: 	new PouchDB('patients')
};


export class DBService {

	/*** Doctor  ***/
	/***************/
	getDoctors(){
		return localDB.doctors.allDocs({ include_docs: true });
	}
	getDoctor(id){
		var doctor = localDB.doctors.get(id, {attachments: true});
		return doctor;
	}
	getDocFrmEmail(data){
		return localDB.doctors.find({
		  selector: {email: data}	
		})
	}
	addDoctor(doc){			
		doc._id = 'doc'+doc.name;
		return localDB.doctors.put(doc);
	}
	updateDoctor(doc){
		console.log(doc);
		return localDB.doctors.put(doc)
	}
	// addDocPatient(doc){
	// 	return localDB.doctors.put(doc);
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
		patient._id = 'pat'+patient.name+patient.phone;
		return localDB.patients.put(patient);
	}
	removePatientFile(docID, patID, rev){
		return localDB.patients.removeAttachment(patID, docID, rev);
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