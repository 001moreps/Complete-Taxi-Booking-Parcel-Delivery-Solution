import {Injectable} from '@angular/core';
import {Observable,of} from 'rxjs';
import {CatalogueModel,RepairService} from '../models/catalogue.model';
@Injectable({providedIn:'root'})
export class CatalogueService{
 getModels(_brandId?:string):Observable<CatalogueModel[]>{return of([]);}
 getServices(_modelId?:string):Observable<RepairService[]>{return of([]);}
}