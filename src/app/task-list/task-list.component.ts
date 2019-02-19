import { Component, OnInit } from '@angular/core';
import { TasklistService } from '../tasklist.service';
import { ViewChild } from '@angular/core';
import { Events, IonSlides, Config, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [ IonSlides, Config, Platform]
})
export class TaskListComponent implements OnInit {

	@ViewChild('slides') slides: IonSlides;
	tasklists: Array<Object>;
	tasklistService: TasklistService;
	currentTasklist: number = 0;

	constructor(private _ts: TasklistService, private _e: Events, private _ac: AlertController) {
		this.tasklistService = _ts;
		this.tasklists = _ts.getTasklists();
	}

	ngOnInit() {
		this._e.subscribe('update', ()=>{
			this.tasklists = this.tasklistService.getTasklists();
			// If I was smart I would have implemented getTasklists as a promise. Remember for the future.
			setTimeout(()=>{
				this.slides.update();
			}, 300);
		});

		this._e.subscribe('complete', ()=>{
			this.presentAlert();
		});

		this._e.subscribe('reset', ()=>{
			this.tasklists = this.tasklistService.getTasklists();
		});

		this._e.subscribe('tasklists', ()=>{
			this.tasklists = this.tasklistService.getTasklists();
		});
	}

	completeTask(tasklist: number, task: number, state: boolean){
		this.tasklistService.completeTask(tasklist, task, state);
	}

	ionSlideDidChange(event){
		this.tasklistService.setActiveTasklist(this.slides.getActiveIndex());
	}

	resetTasklist(){
		this.tasklistService.resetTasklist();
		this.tasklists = this.tasklistService.getTasklists();
	}

	async presentAlert() {

		const alert = await this._ac.create({
		  header: 'You completed ' + this._ts.getCurrentTasklist().title,
		  message: this._ts.getCurrentTasklist().affirmation,
		  buttons: ['OK Cool!']
		});

		await alert.present();
	}

}
