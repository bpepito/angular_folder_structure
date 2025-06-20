import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notification2Service } from 'src/app/service/notification2.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  notification = {
    show: true,
    type: 'success',
    message: 'Welcome to your Todo App!',
  };
  private notificationSubscription?: Subscription;

  constructor(private notificationService: Notification2Service) {}

  ngOnInit(): void {
    this.notificationSubscription = this.notificationService
      .getNotification$()
      .subscribe((notif) => {
        this.notification = notif;
      });
  }

  ngOnDestroy(): void {
    this.notificationSubscription?.unsubscribe();
  }
}
