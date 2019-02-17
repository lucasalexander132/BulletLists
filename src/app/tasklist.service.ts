import { Injectable } from '@angular/core';

export interface Tasklist {
  title: string;
  goal: string;
  affirmation: string;
  tasks: Array<string>;
  taskStates: Array<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class TasklistService {

	private tasklists: Array<Tasklist> = [
		{
			title: "Clean Room",
			goal: "I want to have a happy, healthy home!",
			affirmation: "My home is so happy and healthy now!",
			tasks: [
				"Make Bed",
				"Do My Dishes",
				"Do My Laundry"
			],
			taskStates: [
				false,
				false,
				false
			]
		},
		{
			title: "Morning Routine",
			goal: "I want to get up on the right side of the bed!",
			affirmation: "Great way to start the day!",
			tasks: [
				"Brush Teeth",
				"Shower",
				"Make Breakfast"
			],
			taskStates: [
				false,
				false,
				false
			]
		}
	];
	private activeTasklist: number = 0;

	constructor() { }

	getTasklists(){
		return this.tasklists;
	}

	completeTask(tasklist, task, state){
		this.tasklists[tasklist].taskStates[task] = state;
		console.log(this.tasklists);
	}

	setActiveTasklist(id){
		id.then(data => {
			this.activeTasklist = data;
		});		
	}

}
