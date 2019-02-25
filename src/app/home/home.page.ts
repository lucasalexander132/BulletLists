import { Component } from '@angular/core';
import { Events } from '@ionic/angular';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	darkMode: boolean = false;

	constructor(private _ss: SettingsService, private _e: Events){

		this._e.subscribe('settings', ()=>{
	    	this.darkMode = this._ss.getSetting('darkMode');
	    });

	    this._e.subscribe('updateSettings', ()=>{
	    	this.darkMode = this._ss.getSetting('darkMode');
	    });
	}

}
