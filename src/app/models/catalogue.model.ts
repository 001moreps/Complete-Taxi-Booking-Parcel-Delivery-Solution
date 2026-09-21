export type CatalogueStatus='ACTIVE'|'INACTIVE'|'DISCONTINUED';
export interface CatalogueModel{ id:string; brandId:string; familyId:string; name:string; status:CatalogueStatus; imageUrl?:string; }
export interface RepairService{ id:string; name:string; description?:string; status:CatalogueStatus; }