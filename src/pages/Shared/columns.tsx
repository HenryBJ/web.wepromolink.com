import { toast } from "react-toastify";
import { IColumnData } from "../../components/DynamicTable";
import ReactDOMServer from "react-dom/server";
import { gTag } from "../../firebase";

const statsIcon = (<svg className="basis-1/4 w-4 h-4 inline mr-1 my-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
</svg>)

const detailsIcon = (<svg className="basis-1/4 w-4 h-4 inline mr-1 my-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
</svg>
)

const fundsIcon = (<svg className="basis-1/4 w-4 h-4 inline mr-1 my-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
</svg>)

const activeIcon = (<svg className="basis-1/4 w-4 h-4 inline mr-1 my-1 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
</svg>
)

const deactiveIcon = (<svg className="basis-1/4 w-4 h-4 inline mr-1 my-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
</svg>
)

const sharedIcon = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="basis-1/4 w-4 h-4 inline mr-1 my-1 text-gray-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
</svg>

)




const timeSince = (date: Date | null): string => {
  if (date === null) return "never";
  let now = new Date();
  let dif = now.getTime() - date.getTime();
  const seconds = Math.floor(dif / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + " year" + (interval === 1 ? "" : "s") + " ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + " month" + (interval === 1 ? "" : "s") + " ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " day" + (interval === 1 ? "" : "s") + " ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
  }
  return "just now";
}

const handleShare = (title: string, shareUrl: string) => {
  if (navigator.share) {
    navigator.share({
      title: title,
      url: shareUrl,
    })
      .then(() => {
        toast.success('Link ready to be shared!');
        gTag('share', { method: 'lib', content_type: 'link', item_id: title })
      })
      .catch((error) => toast.error(error));
  } else if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        toast.success('Link copied to clipboard!');
        gTag('share', { method: 'clipboard', content_type: 'link', item_id: title })
      })
      .catch((error) => toast.error(error));
  } else {
    console.error('El API de Share no está disponible en este navegador');
  }
};



export const Columns: IColumnData[] = [
  { title: "Id", name: "id", hidden: _ => true },
  { title: "Title", name: "title", hidden: _ => false, maxWidth: e => 150 },
  { title: "Url", name: "url", hidden: w => w < 850 },
  { title: "Status", name: "status", hidden: w => w < 390, transform: e => e ? ReactDOMServer.renderToString(activeIcon) : ReactDOMServer.renderToString(deactiveIcon) },
  { title: "Profit", name: "profit", hidden: w => w < 390, transform: e => `$${e}` },
  { title: "Last Click", name: "lastClick", hidden: w => w < 984, transform: e => timeSince(e) },
  {
    title: "Actions", name: "", hidden: _ => false, extraActions: _ => [
      { title: "Details", icon: detailsIcon, action: (e, navigate) => navigate(`/links/detail/${e.id}`) },
      { title: "Statistics", icon: statsIcon, action: (e, navigate) => navigate(`/links/stats/${e.id}`) },
      { title: "Share", icon: sharedIcon, action: (e) => handleShare(e.title, e.url) },
    ]
  },
];