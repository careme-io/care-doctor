import { 
	Component, 
	OnInit, Input, Output, EventEmitter, 
	OnChanges, SimpleChange, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'advtxtarea',
  templateUrl: './advtxtarea.component.html',
  styleUrls: ['./advtxtarea.component.scss']
})
export class AdvtxtareaComponent implements OnChanges, OnInit {

	@Input() txtValue : String;
	@Input() date : any;
	@Input() dim : any;
	//@Input() pwidth: num
	@Output() savedText = new EventEmitter<{}>();
	@Output() updatedText = new EventEmitter<{}>();
	public comtop;
	public comwidth;

	constructor() { }

	ngOnInit() {
		//this.top = this.dim.height - 10;
		this.comwidth = this.dim.width - 40;
	}

	ngOnChanges(changes: SimpleChanges){
		console.log('changes', changes);
		this.comwidth = this.dim.width - 40;
	}

	saveText(txt){
		console.log(txt);
		this.savedText.emit({date: "", text: txt});
		this.txtValue = "";
	}

	updateText(txt){
		console.log(txt);
		this.savedText.emit({date: this.date, text: txt});
	}

	onTextBlur(){
		this.savedText.emit({date: "", text: ""});
		this.txtValue = "";
	}


}
