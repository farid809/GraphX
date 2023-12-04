import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private refreshWidgets$ = new Subject<void>();

  constructor() { }

  triggerRefresh(){
    this.refreshWidgets$.next();
  }

  getRefreshObservable(){
    return this.refreshWidgets$.asObservable();
  }
}
