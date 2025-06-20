import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UpgradeModule } from '@angular/upgrade/static';
import { TodoComponent } from './component/todo/todo.component';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from './component/notification/notification.component';

@NgModule({
  declarations: [AppComponent, TodoComponent, NotificationComponent],
  imports: [BrowserModule, AppRoutingModule, UpgradeModule, FormsModule],
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
