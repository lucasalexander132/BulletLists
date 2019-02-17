import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

	@Input() task = "Task";
	complete: boolean = false;
	@Output() completed: EventEmitter<any> = new EventEmitter();

	constructor() { }

	ngOnInit() {}

	completeTask(){
		this.complete = !this.complete;
		this.completed.emit(this.complete);
	}

}
