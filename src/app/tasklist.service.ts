import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import * as moment from 'moment';

export interface Tasklist {
  title: string;
  goal: string;
  affirmation: string;
  tasks: Array<string>;
  taskStates: Array<boolean>;
  disableEdit: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TasklistService {

	private tasklists: Array<Tasklist> = [
		{
			title: "Create a Tasklist",
			goal: "Because I want to get stuff done!",
			affirmation: "You're on your way now!",
			tasks: [
				"Open Menu",
				"Tap 'New List'",
				"Create a new list, then swipe left to see it! (p.s. The number in the top left is the lists you've completed today)"
			],
			taskStates: [
				false,
				false,
				false
			],
			disableEdit: false
		}
	];
	defaultTasklist = {
		title: "Create a Tasklist",
		goal: "Because I want to get stuff done!",
		affirmation: "You're on your way now!",
		tasks: [
			"Open Menu",
			"Tap 'New List'",
			"Create a new list, then swipe left to see it!"
		],
		taskStates: [
			false,
			false,
			false
		],
		disableEdit: false
	}
	private activeTasklist: number = 0;
	private completedTasklistsToday = 0;

	constructor(private _e: Events, private _stor: Storage) {

		_stor.get('tasklists').then((val) => {
			if(val){
				this.tasklists = val;
			} else {
				_stor.set('tasklists', this.tasklists);
			}
			this._e.publish('tasklists');
		});

		_stor.get('lastDateOpened').then((lastDateOpened) => {

			if(lastDateOpened && (moment().diff(lastDateOpened, 'days') >= 1)){ // day is next day

				console.log(1);
				this.completedTasklistsToday = 0;
				_stor.set('completedTasklistsToday', this.completedTasklistsToday);

			} else if(lastDateOpened) { // day is still today

				console.log(2);
				_stor.get('completedTasklistsToday').then((val)=>{
					this.completedTasklistsToday = val;
					this._e.publish('completedTasklistsToday');
				});

			} else { // day has never been set

				console.log(3);
				_stor.set('completedTasklistsToday', 0);
			}

			let now = moment().format('L'); // mm:dd:yyyy - No matter what we're setting the date to now since they just logged in, let difined for readability
			_stor.set('lastDateOpened', now);

			this._e.publish('completedTasklistsToday');
		});
		

	}

	storeTasklists(){
		this._stor.set('tasklists', this.tasklists);
	}

	storeCompletedTasklistsToday(){
		this._stor.set('completedTasklistsToday', this.completedTasklistsToday);
	}

	storeAll(){
		this.storeTasklists();
		this.storeCompletedTasklistsToday();
	}

	getTasklists(){
		return this.tasklists;
	}

	getCurrentTasklist(){
		return this.tasklists[this.activeTasklist];
	}

	completeTask(tasklist, task, state){
		this.tasklists[tasklist].taskStates[task] = state;
		let taskStates = this.tasklists[tasklist].taskStates;

		let count = 0;
		for(let i = 0; i < taskStates.length; i++){
			if(taskStates[i])
				count++;
		}

		if(count == 3){
			this.tasklists[tasklist].disableEdit = true;
			this.completedTasklistsToday++;
			this._e.publish('complete');
		}

		this.storeAll();
	}

	resetTasklist(){
		this.tasklists[this.activeTasklist].taskStates = [false,false,false];
		this.tasklists[this.activeTasklist].disableEdit = false;
		this._e.publish('reset');
		this.storeAll();
	}

	getCompletedTasklistsToday(){
		return this.completedTasklistsToday;
	}

	setActiveTasklist(id){
		id.then(data => {
			this.activeTasklist = data;
		});	
	}

	deleteCurrentList(){
		this.tasklists.splice(this.activeTasklist, 1);
		if(this.tasklists.length == 0){
			this.tasklists.push(this.defaultTasklist);
		}
		this.update();
	}

	addTasklist(tasklist: Tasklist){
		this.tasklists.push(tasklist);
		this.update();
	}

	editTasklist(tasklist: Tasklist){
		this.tasklists[this.activeTasklist] = tasklist;
		this.update();
	}

	private update(){
		this._e.publish('update', true);
		this.storeAll();
	}

}
