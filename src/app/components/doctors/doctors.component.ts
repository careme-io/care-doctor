import { Component, OnInit } from '@angular/core';
import { DBService } from './../../services/db.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
  providers: [DBService]
})
export class DoctorsComponent implements OnInit {

	doctor: any = {};
  constructor(private dbService: DBService) { }

  ngOnInit() {
  }

	addDoctor(){
  		var doctor:any = Object.assign({}, this.doctor);
		this.dbService.addDoctor(doctor).then(
	    result => {
	      console.log('doctor added');
	    }, error => {
	      console.error(error);
	    });
	}

}
