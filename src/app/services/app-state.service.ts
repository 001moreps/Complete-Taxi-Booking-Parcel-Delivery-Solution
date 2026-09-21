import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
@Injectable({providedIn:'root'})
export class AppStateService{
 private locationSubject=new BehaviorSubject<{latitude:number;longitude:number;address?:string}|null>(null);
 location$=this.locationSubject.asObservable();
 setLocation(v:{latitude:number;longitude:number;address?:string}){this.locationSubject.next(v);}
}