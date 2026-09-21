import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AngularFireFunctions} from '@angular/fire/compat/functions';
import {Observable} from 'rxjs';
import {Quote} from '../models/quote.model';
@Injectable({providedIn:'root'})
export class QuoteService{
 constructor(private db:AngularFirestore,private functions:AngularFireFunctions){}
 getQuote(id:string):Observable<Quote|undefined>{return this.db.doc<Quote>('quotes/'+id).valueChanges({idField:'id'});}
 acceptQuote(quoteId:string){return this.functions.httpsCallable('acceptQuote')({quoteId});}
}