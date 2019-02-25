import { Component, OnInit } from '@angular/core';
import { TasklistService } from '../tasklist.service';
import { SettingsService } from '../settings.service';
import { ViewChild } from '@angular/core';
import { Events, IonSlides, Config, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [ IonSlides, Config, Platform ]
})
export class TaskListComponent implements OnInit {

	@ViewChild('slides') slides: IonSlides;
	tasklists: Array<Object>;
	tasklistService: TasklistService;
	currentTasklist: number = 0;
	darkMode: boolean = false;

	constructor(private _ts: TasklistService, private _e: Events, private _ac: AlertController, private _ss: SettingsService) {
		this.tasklistService = _ts;
		this.tasklists = _ts.getTasklists();
	}

	ngOnInit() {
		this._e.subscribe('update', ()=>{
			this.tasklists = this.tasklistService.getTasklists();
			// If I was smart I would have implemented getTasklists as a promise. Remember for the future.
			setTimeout(()=>{
				this.slides.update();
				this._e.publish('swipe');
			}, 300);
		});

		this._e.subscribe('complete', ()=>{
			this.presentAlert();
			this.tasklists = this.tasklistService.getTasklists();
		});

		this._e.subscribe('reset', ()=>{
			this.tasklists = this.tasklistService.getTasklists();
		});

		this._e.subscribe('tasklists', ()=>{
			this.tasklists = this.tasklistService.getTasklists();
		});

		this._e.subscribe('settings', ()=>{
	    	this.darkMode = this._ss.getSetting('darkMode');
	    });

	    this._e.subscribe('updateSettings', ()=>{
	    	this.darkMode = this._ss.getSetting('darkMode');
	    });
	}

	completeTask(tasklist: number, task: number, state: boolean){
		this.tasklistService.completeTask(tasklist, task, state);
	}

	ionSlideDidChange(event){
		this._e.publish('swipe');
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
