import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'app-topbar',
	host: {
        '(document:click)': 'handleClick($event)',
	},
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

@ViewChild('launcher') launchPad;
@ViewChild('launchBtn') lBtn;
	public compElement;
	@Input() docName: String;
	showLauncher: boolean = false;
  constructor(elementRef: ElementRef) {
  	this.compElement = elementRef;
  }

  ngOnInit() {
  	console.log(this.launchPad);
  }
  ngOnViewInit() {
  	//console.log(this.mBtn);
  }
  handleClick(event){
  	var clickedElem = event.target;
  	do{
  		if(clickedElem == this.launchPad.nativeElement)
  			return;
  		else if(clickedElem == this.lBtn.nativeElement && !this.showLauncher){
  			this.showLauncher = true;
  			return;
  		}
  	
  		clickedElem = clickedElem.parentNode;
  	}while(clickedElem);
  	this.showLauncher = false;
  }

}
