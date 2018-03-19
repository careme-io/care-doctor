import { Component, OnInit, Input } from '@angular/core';
import { DBService } from './../../services/db.service';

@Component({
  selector: 'status-bar',
  templateUrl: './status-bar.component.html',
  providers: [DBService],
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {

	@Input() docName: string;

  constructor(private dbService: DBService) { }

  ngOnInit() {
  }

  syncDB(){
  	this.dbService.syncDB();
  }

  pullDB(){
      this.dbService.getDoctor().then(doctor => {
          console.log(doctor)
            // doc_pdoctor.patients;
            //console.log(doc_patients);
  	        this.dbService.pullDB(doctor.patients);
      });
  }

  pushDB(){
  	this.dbService.pushDB();
  }

}
