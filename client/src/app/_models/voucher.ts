export interface Voucher{
    id: number,
    code: string,
    discount: number,
    validity: Date,
    available:boolean, 
    AppUserId: number
}