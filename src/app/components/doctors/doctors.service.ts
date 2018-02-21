import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'
import PouchQuickSearch from 'pouchdb-quick-search'
PouchDB.plugin(PouchQuickSearch)
PouchDB.plugin(PouchFind)


let localDB = {
  doctors	: 	new PouchDB('doctors')
};

export class DoctorsService {

	getDoctors(){
		return localDB.doctors.allDocs({ include_docs: true });
	}
	getDoctor(id){
		var doctor = localDB.doctors.get(id, {attachments: true});
		return doctor;
	}
	getDocFrmEmail(data){
	 //localDB.doctors.get(id, {attachments: true});

		return localDB.doctors.find({
		  selector: {email: data}	
		})
		// .then( result =>{
		// 	console.log(result.docs[0]);
		// 	return result;
		// }, error =>{
		// 	console.log(error);
		// });
	}
	addDoctor(doc){			
		doc._id = 'doc'+doc.name;
		return localDB.doctors.put(doc);
	}
	// removeFile(docID, patID, rev){
	// 	return localDB.patients.removeAttachment(patID, docID, rev);
	// }
	updateDoctor(doc){
		return localDB.doctors.put(doc)
	}
	// searchPatient(keyword){
	// 	if(keyword.length > 0){
	// 		return localDB.patients.search({
	// 		    query: keyword,
	// 		    fields: ['name', 'phone', 'city'],
	// 		    mm: '0%',
	// 		    include_docs: true,
	// 		    highlighting: true
	// 		  });
	// 	}
	// }
}