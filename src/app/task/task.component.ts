import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TasklistService } from '../tasklist.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

	@Input() task = "Task";
	@Input() complete: boolean = false;
	@Input() disableEdit: boolean = false;
	@Input() gradients: Array<string> = ["#02AAB0", "#00CDAC"];
	@Output() completed: EventEmitter<any> = new EventEmitter();
	color: string;

	constructor(private _ts: TasklistService) {
	}

	ngOnInit() {
		this.color = this._ts.getRandomColor(this.gradients[0], this.gradients[1]);
	}

	completeTask(){
		if(!this.disableEdit){
			this.complete = !this.complete;
			this.completed.emit(this.complete);
		}		
	}

}
