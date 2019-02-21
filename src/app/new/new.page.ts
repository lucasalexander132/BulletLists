import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { TasklistService } from '../tasklist.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

	title: string = "Title";
	goal: string = "This is the goal of your list";
	affirmation: string = "Affirmation when you complete this list";
	task1: string = "First task";
	task2: string = "Second task";
	task3: string = "Third task";

	constructor(private _nc: NavController, private _ts: TasklistService) { }

	ngOnInit() {
	}

	back(){
		this._nc.navigateBack('/home');
	}

	completeList(){

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
			timesCompleted: [],
			gradients: []
		};
		
		this._nc.navigateBack('/home');
		this._ts.addTasklist(tasklist);
	}

}
