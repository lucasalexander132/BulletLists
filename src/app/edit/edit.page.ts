import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NavController, Events } from '@ionic/angular';
import { TasklistService } from '../tasklist.service';
import { Tasklist } from '../tasklist.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

	title: string = "Title";
	goal: string = "This is the goal of your list";
	affirmation: string = "Affirmation when you complete this list";
	task1: string = "First task";
	task2: string = "Second task";
	task3: string = "Third task";
	currentTasklist: Tasklist;
	gradients: Array<string> = [];

	darkMode: boolean = false;

	constructor(private _nc: NavController, private _ts: TasklistService, private _ss: SettingsService,  private _e: Events) {
		this.currentTasklist = _ts.getCurrentTasklist();
		this.title = this.currentTasklist.title;
		this.goal = this.currentTasklist.goal;
		this.affirmation = this.currentTasklist.affirmation;
		this.task1 = this.currentTasklist.tasks[0];
		this.task2 = this.currentTasklist.tasks[1];
		this.task3 = this.currentTasklist.tasks[2];
		this.gradients = this.currentTasklist.gradients;
	}

	ngOnInit() {
		this.darkMode = this._ss.getSetting('darkMode');

		this._e.subscribe('settings', ()=>{
	    	this.darkMode = this._ss.getSetting('darkMode');
	    });

	    this._e.subscribe('updateSettings', ()=>{
	    	this.darkMode = this._ss.getSetting('darkMode');
	    });

	}

	back(){
		this._nc.navigateBack('/home');
	}

	completeList(){

		let timesCompleted = this.currentTasklist.timesCompleted;
		let gradients = this.currentTasklist.gradients;

		let tasklist = {
			title: this.title,
			goal: this.goal,
			affirmation: this.affirmation,
			tasks: [
				this.task1,
				this.task2,
				this.task3
			],
			taskStates: [
				false,
				false,
				false
			],
			disableEdit: false,
			timesCompleted: timesCompleted,
			gradients: gradients
		};

		if(!gradients.length){
			tasklist = this._ts.addGradient(tasklist);
		}
		
		this._ts.editTasklist(tasklist);
		this._nc.navigateBack('/home');
	}
}
