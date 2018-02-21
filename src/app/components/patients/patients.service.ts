import PouchDB from 'pouchdb'
import PouchQuickSearch from 'pouchdb-quick-search'
PouchDB.plugin(PouchQuickSearch)


let localDB = {
  patients	: 	new PouchDB('patients')
};

export class PatientsService {

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
	removeFile(docID, patID, rev){
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