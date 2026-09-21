import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { CatalogueModel, RepairService } from '../models/catalogue.model';

@Injectable({providedIn:'root'})
export class CatalogueService {
 constructor(private db:AngularFirestore){}
 getModels(brandId?:string):Observable<CatalogueModel[]>{
  const ref=(r:any)=>brandId?r.where('brandId','==',brandId).where('status','==','ACTIVE'):r.where('status','==','ACTIVE');
  return this.db.collection<CatalogueModel>('catalogue_models',ref).valueChanges({idField:'id'});
 }
 getServices():Observable<RepairService[]>{
  return this.db.collection<RepairService>('repair_services',ref=>ref.where('status','==','ACTIVE')).valueChanges({idField:'id'});
 }
}