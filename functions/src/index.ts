import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { onCall, HttpsError } from 'firebase-functions/v2/https';

initializeApp();
const db=getFirestore();

type JobStatus='REQUESTED'|'REVIEWING'|'QUOTE_SENT'|'ACCEPTED'|'TRAVELLING'|'ARRIVED'|'DIAGNOSING'|'REPAIRING'|'REVISION_REQUIRED'|'COMPLETED'|'CANCELLED';

const transitions:Record<JobStatus,JobStatus[]>={
 REQUESTED:['REVIEWING','CANCELLED'], REVIEWING:['QUOTE_SENT','CANCELLED'], QUOTE_SENT:['ACCEPTED','CANCELLED'],
 ACCEPTED:['TRAVELLING','CANCELLED'], TRAVELLING:['ARRIVED'], ARRIVED:['DIAGNOSING'],
 DIAGNOSING:['REPAIRING','REVISION_REQUIRED'], REPAIRING:['COMPLETED','REVISION_REQUIRED'],
 REVISION_REQUIRED:['QUOTE_SENT'], COMPLETED:[], CANCELLED:[]
};

function requireAuth(request:any){if(!request.auth)throw new HttpsError('unauthenticated','Authentication required.');return request.auth.uid;}
async function role(uid:string){return (await db.doc('users/'+uid).get()).data()?.role;}

export const createRepairRequest=onCall(async request=>{
 const uid=requireAuth(request); const data=request.data||{};
 if(await role(uid)!=='CUSTOMER')throw new HttpsError('permission-denied','Only customers can create repair requests.');
 if(!data.deviceSnapshot||!data.problem||!data.location)throw new HttpsError('invalid-argument','Device, problem and location are required.');
 const ref=db.collection('repair_jobs').doc();
 const job={customerId:uid,repairerId:null,schedulingType:data.schedulingType==='SCHEDULED'?'SCHEDULED':'ASAP',scheduledAt:data.scheduledAt||null,deviceSnapshot:data.deviceSnapshot,problem:String(data.problem).trim(),description:String(data.description||'').trim(),location:data.location,jobStatus:'REQUESTED',paymentStatus:'UNPAID',activeQuoteId:null,createdAt:FieldValue.serverTimestamp(),updatedAt:FieldValue.serverTimestamp()};
 await ref.set(job); await db.collection('audit_logs').add({actorId:uid,action:'CREATE_REPAIR_REQUEST',entityId:ref.id,createdAt:FieldValue.serverTimestamp()});
 return {jobId:ref.id};
});

export const transitionJob=onCall(async request=>{
 const uid=requireAuth(request); const {jobId,nextStatus}=request.data||{};
 if(!jobId||!nextStatus)throw new HttpsError('invalid-argument','jobId and nextStatus are required.');
 const ref=db.doc('repair_jobs/'+jobId); const snap=await ref.get(); if(!snap.exists)throw new HttpsError('not-found','Repair job not found.');
 const job=snap.data() as any; const actorRole=await role(uid);
 if(job.customerId!==uid&&job.repairerId!==uid&&actorRole!=='ADMIN')throw new HttpsError('permission-denied','You are not a participant in this job.');
 if(!transitions[job.jobStatus as JobStatus]?.includes(nextStatus))throw new HttpsError('failed-precondition',`Invalid transition from ${job.jobStatus} to ${nextStatus}.`);
 await ref.update({jobStatus:nextStatus,updatedAt:FieldValue.serverTimestamp()});
 await db.collection('audit_logs').add({actorId:uid,action:'TRANSITION_JOB',entityId:jobId,from:job.jobStatus,to:nextStatus,createdAt:FieldValue.serverTimestamp()});
 return {jobId,status:nextStatus};
});

export const acceptQuote=onCall(async request=>{
 const uid=requireAuth(request); const {quoteId}=request.data||{}; if(!quoteId)throw new HttpsError('invalid-argument','quoteId is required.');
 const ref=db.doc('quotes/'+quoteId); const snap=await ref.get(); if(!snap.exists)throw new HttpsError('not-found','Quote not found.');
 const quote=snap.data() as any; if(quote.customerId!==uid)throw new HttpsError('permission-denied','Only the customer can accept this quote.');
 if(quote.status!=='SENT')throw new HttpsError('failed-precondition','Only a sent quote can be accepted.');
 await db.runTransaction(async tx=>{tx.update(ref,{status:'ACCEPTED',acceptedAt:FieldValue.serverTimestamp()});tx.update(db.doc('repair_jobs/'+quote.jobId),{jobStatus:'ACCEPTED',activeQuoteId:quoteId,updatedAt:FieldValue.serverTimestamp()});});
 return {quoteId,status:'ACCEPTED'};
});
