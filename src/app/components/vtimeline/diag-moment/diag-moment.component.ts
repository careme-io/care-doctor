import { 
	Component,
	OnInit, Input, Output, EventEmitter,
} from '@angular/core';

@Component({
  selector: 'diag-moment',
  templateUrl: './diag-moment.component.html',
  styleUrls: ['./diag-moment.component.scss']
})
export class DiagMomentComponent implements OnInit {

  @Input() moment: any;
  @Output() updatedText = new EventEmitter<{}>();
  withinEdit= false;
  selected= false;
  edited= false;
  txtValue: String;
  constructor() { }

  ngOnInit() {
  	
  	console.log('checking');
  	let now = new Date();
  	let p24 = new Date();
  	p24.setDate(now.getDate() - 1);
  	let mdate = new Date(this.moment.date);
  	if(mdate > p24){
  		console.log("it is true");
  		this.withinEdit = true;
  	}else{
  		console.log("It it false");
  		this.withinEdit = false;
  	}
  }

  editText(){
  	this.selected= true;
  	this.txtValue = this.moment.text;
  }

  saveText(text){
  	this.updatedText.emit({date: this.moment.date, text: text});
    
  }

}
