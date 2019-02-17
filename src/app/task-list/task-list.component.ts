import { Component, OnInit } from '@angular/core';
import { TasklistService } from '../tasklist.service';
import { TaskComponent } from '../task/task.component';
import { ViewChild } from '@angular/core';
import { Slides, Config, Platform } from 'ionic-angular';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [ Slides, Config, Platform]
})
export class TaskListComponent implements OnInit {

	@ViewChild('slides') slides: Slides;
	tasklists: Array<Object>;
	tasklistService: TasklistService;
	currentTasklist: number = 0;

	constructor(private _ts: TasklistService) {
		this.tasklistService = _ts;
		this.tasklists = _ts.getTasklists();
	}

	ngOnInit() {
	}

	completeTask(tasklist: number, task: number, state: boolean){
		this.tasklistService.completeTask(tasklist, task, state);
	}

	ionSlideDidChange(event){
		this.tasklistService.setActiveTasklist(this.slides.getActiveIndex());
	}

}
