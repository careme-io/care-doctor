import { 
	Component, 
	OnInit, AfterViewChecked, 
	ElementRef, ViewChild,
	Input, Output, EventEmitter 
} from '@angular/core';

@Component({
  selector: 'vtimeline',
  templateUrl: './vtimeline.component.html',
  styleUrls: ['./vtimeline.component.scss']
})
export class VtimelineComponent implements OnInit, AfterViewChecked {

	@ViewChild('scrollBottom') private scrollWrapper: ElementRef; 
	@Input() moments: any;
	@Input() dim: any;
	@Output() selectedMoment = new EventEmitter<{}>();
	@Output() savedText = new EventEmitter<{}>();
	public timelineHeight;
	constructor() { }

	ngOnInit() {
		this.timelineHeight = this.dim.height;
		this.scrollToBottom();
	}

	ngAfterViewChecked(){
		this.scrollToBottom();

		this.timelineHeight = this.dim.height;
	}

	passSaved(e){
		//this.selectedMoment.emit(e);
		this.savedText.emit(e); 
	}

	scrollToBottom(): void{
		console.log(this.scrollWrapper.nativeElement.scrollHeight);
		try {
			this.scrollWrapper.nativeElement.scrollTop = this.scrollWrapper.nativeElement.scrollHeight;
		} catch(err) { } 
	}

}
