import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

	// I created this for storing settings in Ionic but it could be used for any dynamic object creation, though only once because storage will overwrite
	// I guess you could just change every instance of the word setting to something unique and make it a whole new service

	private settings: Object = {};

	constructor(private _storage: Storage, private _events: Events) {
		_storage.get('settings').then(val => {
			val ? this.settings = val : null;
			_events.publish('settings');
		});
	}

	addSetting(key: string, value: any){
		if(this.settings[key] == undefined)
			this.settings[key] = value;
		this.storeSettings();
	}

	getSetting(key: string){
		if(!(this.settings[key] == undefined))
			return this.settings[key];
		return undefined;
	}

	updateSetting(key: string, value: any){
		if(!(this.settings[key] == undefined)){
			this.settings[key] = value;
			this.storeSettings();
		} else {
			console.log("Warning: Setting for '" + key + "' does not exist.");
		}
		this._events.publish('updateSettings');
	}

	deleteSetting(key: string){
		if(!(this.settings[key] == undefined))
			delete this.settings[key];
	}

	storeSettings(){
		this._storage.set('settings', this.settings)
	}

	log(){
		console.log(this.settings);
	}

}
