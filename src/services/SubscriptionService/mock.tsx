import { ISubscriptionResponse } from "../../interfaces/Responses";

export const subsListMock: ISubscriptionResponse = {
    pagination: { cant: 2, page: 1, totalPages: 1, lastPage:1},
    items: [
        {id:1,title:"Community",inUse:true,ads:true,depositFee:5,payoutFee:5,discount:0,interval:'monthly',paymentMethod:'Bitcoin',payoutMinimun:100, price:0,tag:''},
        {id:2,title:"Professional",inUse:false,ads:false,depositFee:0,payoutFee:0,discount:0,interval:'monthly',paymentMethod:'Visa, MasterCard, Stripe',payoutMinimun:50, price:4.99,tag:'Popular'},
        {id:3,title:"Professional",inUse:false,ads:false,depositFee:0,payoutFee:0,discount:8.34,interval:'annually',paymentMethod:'Visa, MasterCard, Stripe',payoutMinimun:50, price:54.89,tag:'Popular'},
       
    ]
  }