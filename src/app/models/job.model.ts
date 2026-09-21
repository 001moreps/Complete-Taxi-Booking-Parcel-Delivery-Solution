export type JobStatus='REQUESTED'|'REVIEWING'|'QUOTE_SENT'|'ACCEPTED'|'TRAVELLING'|'ARRIVED'|'DIAGNOSING'|'REPAIRING'|'REVISION_REQUIRED'|'COMPLETED'|'CANCELLED';
export type PaymentStatus='UNPAID'|'PENDING_PROVIDER'|'PAID'|'CASH_COLLECTED';
export interface DeviceSnapshot{category:string;brand:string;family?:string;model?:string;}
export interface JobLocation{latitude:number;longitude:number;address?:string;}
export interface RepairJob{id:string;customerId:string;repairerId?:string;deviceSnapshot:DeviceSnapshot;problem:string;description?:string;location:JobLocation;schedulingType:'ASAP'|'SCHEDULED';scheduledAt?:string;jobStatus:JobStatus;paymentStatus:PaymentStatus;activeQuoteId?:string;createdAt?:unknown;}