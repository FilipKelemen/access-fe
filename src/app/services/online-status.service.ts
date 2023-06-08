import { Injectable } from '@angular/core';
import {BehaviorSubject, fromEvent, map, merge} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class OnlineStatusService {

  isOnline$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(window.navigator.onLine)
  constructor() {
    merge(
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).pipe(map(() => navigator.onLine)).subscribe(this.isOnline$)
  }
}
