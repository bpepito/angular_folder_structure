import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AppState as StorageState,
  storageStore,
  setItem,
  removeItem,
} from '../store/storage/storage.store';

@Injectable({
  providedIn: 'root',
})
export class Storage2Service {
  private stateSubject = new BehaviorSubject<StorageState>(
    storageStore.getState()
  );
  public state$ = this.stateSubject.asObservable();

  constructor() {
    storageStore.subscribe(() => {
      this.stateSubject.next(storageStore.getState());
    });
  }

  getState(): StorageState {
    return storageStore.getState();
  }

  getState$(): Observable<StorageState> {
    return this.state$;
  }

  // Actions

  get(key: string): any {
    const state = storageStore.getState();
    return state[key];
  }

  set(key: any, value: any) {
    storageStore.dispatch(setItem(key, value));
  }

  removeItem(key: any) {
    storageStore.dispatch(removeItem(key));
  }
}
