import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {


  private sideNav$  = new BehaviorSubject<string>('');
  activatePanel= this.sideNav$.asObservable();

  constructor() { }

  navigate(destination: string){
    this.sideNav$.next(destination);
  }


}
