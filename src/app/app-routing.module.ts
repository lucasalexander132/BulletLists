import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPage } from './new/new.page';
import { HomePage } from './home/home.page';
import { EditPage } from './edit/edit.page';
import { DonationPage } from './donation/donation.page';
import { SettingsPage } from './settings/settings.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'edit', component: EditPage },
  { path: 'new', component: NewPage },
  { path: 'donation', component: DonationPage },
  { path: 'settings', component: SettingsPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
