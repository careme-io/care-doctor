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
  	this.dbService.pushDB();
  }

  pullDB(){
  	this.dbService.pushDB();
  }

  pushDB(){
  	this.dbService.pushDB();
  }

}
