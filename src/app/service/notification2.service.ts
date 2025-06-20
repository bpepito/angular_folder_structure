import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AppState as NotificationState,
  notifStore,
  showNotification,
  hideNotification,
} from '../store/notification/notification.store';

@Injectable({
  providedIn: 'root',
})
export class Notification2Service {
  private stateSubject = new BehaviorSubject<NotificationState>(
    notifStore.getState()
  );
  public state$ = this.stateSubject.asObservable();

  constructor() {
    notifStore.subscribe(() => {
      this.stateSubject.next(notifStore.getState());
    });
  }

  getState(): NotificationState {
    return notifStore.getState();
  }

  getState$(): Observable<NotificationState> {
    return this.state$;
  }

  getNotification(): NotificationState {
    return notifStore.getState();
  }

  getNotification$(): Observable<any> {
    return new Observable((observer) => {
      observer.next(this.getNotification());

      const unsubscribe = notifStore.subscribe(() => {
        observer.next(this.getNotification());
      });

      return () => unsubscribe();
    });
  }

  // Actions
  showNotification(message: string, type: 'success') {
    notifStore.dispatch(showNotification(message, type));
  }

  hideNotification() {
    notifStore.dispatch(hideNotification());
  }
}
