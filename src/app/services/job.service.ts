import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AngularFireFunctions} from '@angular/fire/compat/functions';
import {Observable} from 'rxjs';
import {RepairJob} from '../models/job.model';
@Injectable({providedIn:'root'})
export class JobService{
 constructor(private db:AngularFirestore,private functions:AngularFireFunctions){}
 getJob(id:string):Observable<RepairJob|undefined>{return this.db.doc<RepairJob>('repair_jobs/'+id).valueChanges({idField:'id'});}
 createRepairRequest(data:Partial<RepairJob>){return this.functions.httpsCallable('createRepairRequest')(data);}
 transitionJob(jobId:string,nextStatus:string){return this.functions.httpsCallable('transitionJob')({jobId,nextStatus});}
}