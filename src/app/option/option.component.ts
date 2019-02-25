import { OnInit, AfterViewInit } from '@angular/core';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'option-item',
  templateUrl: 'option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit, AfterViewInit {

	@Input() name: string = 'None Specified';
	@Input() on: boolean = false;
	@Output() switched: EventEmitter<any> = new EventEmitter();
	circPos: Object = {
		'left': '1px'
	};
	switchCol: Object = {
		'background': 'rgba(200,200,200,0.9)'
	};


	constructor() {
		
	}

	ngOnInit(){
	
	}

	ngAfterViewInit(){
			if(this.on){
				this.circPos['left'] = '21px';
				this.switchCol['background'] = '#00CDAC';
			} else {
				this.circPos['left'] = '1px';
				this.switchCol['background'] = 'rgba(200,200,200,0.9)';
			}
	}

	switch(){
		this.switched.emit(null);
		if(!this.on){
			this.circPos['left'] = '21px';
			this.switchCol['background'] = '#00CDAC';
		} else {
			this.circPos['left'] = '1px';
			this.switchCol['background'] = 'rgba(200,200,200,0.9)';
		}
		this.on = !this.on;
	}

}
