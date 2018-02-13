import { 
	Component,
	OnInit, Input, Output, EventEmitter,
} from '@angular/core';

@Component({
  selector: 'att-viewer',
  templateUrl: './att-viewer.component.html',
  styleUrls: ['./att-viewer.component.scss']
})
export class AttViewerComponent implements OnInit {

	@Input() attachment: any;
  	@Output() closeAtt = new EventEmitter<{}>();

  constructor() { }

  ngOnInit() {
  	console.log('showing image', this.attachment);
  }

  onClose(){
  	console.log('going to close');
  	this.closeAtt.emit({data: true});
  }

}
