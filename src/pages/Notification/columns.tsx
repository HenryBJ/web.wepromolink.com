import { toast } from "react-toastify";
import { IColumnData } from "../../components/DynamicTable";
import { timeSince } from "../../common";
import { deleteNotification } from "../../services";
import { gTag } from "../../lib/firebase";


const detailsIcon = (<svg className="basis-1/4 w-4 h-4 inline mr-1 my-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
</svg>
)

const deleteIcon = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="basis-1/4 w-4 h-4 inline mr-1 my-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
)

const handleDelete = (id: string, reload: () => void, setLoading: (value: React.SetStateAction<boolean>) => void) => {
  setLoading(true);
  deleteNotification(id)
    .then(res => {
      toast.success("Notification deleted !!!");
      gTag('notification_deleted', { notificationId: id })
      reload();
    })
    .catch(error => toast.error(error.response?.data))
    .finally(() => setLoading(false));
}

export const Columns: IColumnData[] = [
  { title: "Id", name: "id", hidden: _ => true },
  { title: "Title", name: "title", hidden: _ => false, maxWidth: e => 150 },
  { title: "Status", name: "status", hidden: w => w < 350, transform: e => e === 'Unread' ? `<b>${e}</b>` : e },
  { title: "Created", name: "createdAt", hidden: w => w < 630, transform: e => timeSince(e) },
  {
    title: "Actions", name: "", hidden: _ => false, extraActions: _ => [
      { title: "Details", icon: detailsIcon, action: (e, navigate) => navigate(`/notifications/detail/${e.id}`) },
      { title: "Delete", icon: deleteIcon, requiredConfirmation: true, confirmationText: "Do you want to delete this notification?", action: (e, _, reload, setLoading) => handleDelete(e.id, reload, setLoading) },
    ]
  },
];