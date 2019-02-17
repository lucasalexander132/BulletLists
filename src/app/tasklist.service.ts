import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasklistService {

	tasklists: Array<Object> = [
		{
			title: "Clean Room",
			goal: "I want to have a happy, healthy home!",
			affirmation: "My home is so happy and healthy now!",
			tasks: [
				"Make Bed",
				"Do My Dishes",
				"Do My Laundry"
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
			]
		}
	];

	constructor() { }

	getTasklists(){
		return this.tasklists;
	}

}
