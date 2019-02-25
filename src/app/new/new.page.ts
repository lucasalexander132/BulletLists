import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NavController, Events } from '@ionic/angular';
import { TasklistService } from '../tasklist.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

	formFields = {
		title: "Title",
		goal: "This is the goal of your list",
		affirmation: "Affirmation when you complete this list",
		task1: "First task",
		task2: "Second task",
		task3: "Third task"
	}
	defaultForm = {
		title: "Title",
		goal: "This is the goal of your list",
		affirmation: "Affirmation when you complete this list",
		task1: "First task",
		task2: "Second task",
		task3: "Third task"
	}

	darkMode: boolean = false;

	constructor(private _nc: NavController, private _ts: TasklistService, private _ss: SettingsService,  private _e: Events) { }

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
		let tasklist = this.createTasklist();
		this._nc.navigateBack('/home');
		this._ts.addTasklist(tasklist);
	}

	clear(input){
		if(this.defaultForm[input] == this.formFields[input])
			this.formFields[input] = "";
	}

	createTasklist(){
		let tasklist;
		return tasklist = {
			title: this.formFields.title,
			goal: this.formFields.goal,
			affirmation: this.formFields.affirmation,
			tasks: [
				this.formFields.task1,
				this.formFields.task2,
				this.formFields.task3
			],
			taskStates: [
				false,
				false,
				false
			],
			disableEdit: false,
			timesCompleted: [],
			gradients: []
		};
	}

}
