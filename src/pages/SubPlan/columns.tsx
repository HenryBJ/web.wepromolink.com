import { IColumnData } from "../../components/DynamicTable";


const checkIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg>




export const Columns: IColumnData[] = [
  { title: "Id", name: "id", hidden: _ => true },
  { title: "Title", name: "title", hidden: _ => false },
  { title: "In Use", name: "inUse", hidden: w=> w < 403, transform:(e)=> e?checkIcon:'' },
  { title: "Price", name: "price", hidden: _ => false, transform:(e)=>`$${e}` },
  { title: "Interval", name: "interval", hidden: _ => false },
  { title: "Payment method", name: "paymentMethod", hidden: w=> w < 526 },
  { title: "Discount", name: "discount", hidden: w=> w < 918, transform:(e)=>`${e}%` },
  { title: "Deposit fee", name: "depositFee", hidden: w=> w < 813, transform:(e)=>`${e}%` },
  { title: "Payout fee", name: "payoutFee", hidden: w=> w < 813, transform:(e)=>`${e}%` },
  { title: "Payout minimun", name: "payoutMinimun", hidden:w=> w < 680, transform:(e)=>`$${e}` },
  { title: "Ads", name: "ads", hidden: w => w < 984, transform:(e)=> e?checkIcon:'' },
  { title: "Tag", name: "tag", hidden: _ => true },
//   {
//     title: "Actions", name: "", hidden: _ => false, extraActions: [
//       { title: "Details", icon: detailsIcon, action: (e) => alert(e.id) },
//     ]
//   },
];
