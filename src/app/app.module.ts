import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UpgradeModule } from '@angular/upgrade/static';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, UpgradeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {}

  ngDoBootstrap() {
    // console.log('Starting bootstrap...');
    // console.log('Registering service...');
    // Now downgrade the service (after Angular is ready)
    // angular
    //   .module('taskApp')
    //   .factory('Task2Service', downgradeInjectable(Task2Service));
    // console.log('Bootstrapping AngularJS...');
    // Bootstrap AngularJS
    // this.upgrade.bootstrap(document.documentElement, ['taskApp']);
    // console.log('Bootstrap complete');
  }
}
