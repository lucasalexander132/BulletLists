import { Component, OnInit } from '@angular/core';
import { TasklistService } from '../tasklist.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {

	tasklists: Array<Object>;

	constructor(private _ts: TasklistService) {
		this.tasklists = _ts.getTasklists();
	}

	ngOnInit() {}

}
