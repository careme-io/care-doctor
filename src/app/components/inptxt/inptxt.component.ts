import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'inptxt',
  templateUrl: './inptxt.component.html',
  styleUrls: ['./inptxt.component.scss'],
  host: {
        '(document:click)': 'handleClick($event)',
  }
})
export class InptxtComponent implements OnInit {

	public elementRef;
	@Input() label: String;
	@Input() readonly: Boolean = false;
	@Input() key: String;
	@Input() inpValue: any;
	@Output() changedDetail = new EventEmitter<{}>();
	state: String = "empty";
	initValue: any;
	isFocus: Boolean = false;

	constructor(element: ElementRef) { 
		this.elementRef = element;
	}

	ngOnChanges(){
		if(this.inpValue != undefined && this.inpValue.length > 0){
			this.state = "hasData";
		}else{
			this.state = "empty";
		}
		this.initValue =  this.inpValue;
	}

	ngOnInit() {
		this.initValue = this.inpValue;
	}

	onFocus(){
		if(!this.readonly){
			this.state = "active";
			var inp = this.elementRef.nativeElement.querySelector('#'+this.label+this.key);
			inp.focus();
		}
	}

	onBlur(){
		if(!this.readonly){
			if(this.state == 'dirty'){
				this.inpValue = this.initValue;
			}
			this.state = "hasData";
		}
	}

	onKeyPressed(e){
		if(!this.readonly){
			if(this.inpValue != this.initValue){
				this.state = "dirty";
				console.log('dirty');
			}
		}
	}

	handleClick(e){
		var clickedComponent = e.target;
		var onTarget = false;
		do {
			if (clickedComponent === this.elementRef.nativeElement) {
			   onTarget = true;
			}
			clickedComponent = clickedComponent.parentNode;
		} while (clickedComponent);
		(onTarget) ? this.onFocus() : this.onBlur();
	}

	saveChanges(){
		this.changedDetail.emit({"key": this.key, "value": this.inpValue});
	}

	cancelChanges(){
		this.onBlur();
	}

}
