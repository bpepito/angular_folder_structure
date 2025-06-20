import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { downgradeInjectable, UpgradeModule } from '@angular/upgrade/static';

import './assets/legacy/js/app.js';
import './assets/legacy/js/controllers/todoController.js';
import './assets/legacy/js/services/notificationService.js';
import './assets/legacy/js/services/storageService.js';
import './assets/legacy/js/services/todoService.js';

import { Todo2Service } from './app/service/todo2.service';
import { Storage2Service } from './app/service/storage2.service';
import { Notification2Service } from './app/service/notification2.service';

declare var angular: any;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((platformRef) => {
    angular
      .module('todoApp')
      .factory('Todo2Service', downgradeInjectable(Todo2Service))
      .factory('Storage2Service', downgradeInjectable(Storage2Service))
      .factory(
        'Notification2Service',
        downgradeInjectable(Notification2Service)
      );
    const upgrade = platformRef.injector.get(UpgradeModule);
    upgrade.bootstrap(document.body, ['todoApp']);
  })
  .catch((err) => console.error(err));
