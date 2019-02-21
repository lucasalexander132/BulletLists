import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

export interface Tasklist {
  title: string;
  goal: string;
  affirmation: string;
  tasks: Array<string>;
  taskStates: Array<boolean>;
  disableEdit: boolean;
  timesCompleted: number;
  gradients: Array<string>;
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
			disableEdit: false,
			timesCompleted: 0,
			gradients: [
				"#02AAB0",
				"#00CDAC"
			]
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
		disableEdit: false,
		timesCompleted: 0,
		gradients: [
			"#02AAB0",
			"#00CDAC"
		]
	}
	private activeTasklist: number = 0;
	private completedTasklistsToday = 0;
	private gradients: Array<any>;

	constructor(private _e: Events, private _stor: Storage, private _http: HttpClient) {

		// this.storeTasklists();

		_http.get('../assets/gradients.json').subscribe(data => {
			this.gradients = data;
		});

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

				this.completedTasklistsToday = 0;
				_stor.set('completedTasklistsToday', this.completedTasklistsToday);

			} else if(lastDateOpened) { // day is still today

				_stor.get('completedTasklistsToday').then((val)=>{
					this.completedTasklistsToday = val;
					this._e.publish('completedTasklistsToday');
				});

			} else { // day has never been set

				_stor.set('completedTasklistsToday', 0);

			}

			// mm:dd:yyyy - No matter what we're setting the date to now since they just logged in, let difined for readability
			_stor.set('lastDateOpened', moment().format('L'));

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
			this.tasklists[tasklist].timesCompleted++;
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
		tasklist = this.addGradient(tasklist);
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

	addGradient(tasklist: Tasklist){
		let randIndex = Math.floor(Math.random() * this.gradients.length);
		tasklist.gradients = [this.gradients[randIndex].colors[0], this.gradients[randIndex].colors[1]];
		return tasklist;
	}

}
