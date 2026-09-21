export type QuoteStatus='DRAFT'|'SENT'|'ACCEPTED'|'DECLINED'|'SUPERSEDED';
export type QuoteItemType='PART'|'LABOUR'|'TRANSPORT'|'OTHER';
export interface QuoteItem{ id?:string;type:QuoteItemType;partId?:string;description:string;quantity:number;unitPriceMinor:number;totalMinor:number;}
export interface Quote{id:string;jobId:string;version:number;parentQuoteId?:string;status:QuoteStatus;subtotalMinor:number;transportMinor:number;discountMinor:number;totalMinor:number;currency:'GHS';items?:QuoteItem[];createdAt?:unknown;}