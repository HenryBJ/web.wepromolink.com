import { faMoneyBill, faMoneyBill1, faMoneyBill1Wave, faMoneyBillAlt, faMoneyBillTransfer, faMoneyBillWheat, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICampaingCard } from "../../interfaces/ICampaingCard";


export default function CampaignCard(data: ICampaingCard) {
    return (
        <>
            <div className="max-w-sm rounded-md overflow-hidden shadow-lg bg-white ">
                <img className="w-full" src={data.imageUrl} alt="Campaign image" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{data.title}</div>
                    <p className="text-gray-700 text-base">
                        {data.description}
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2 flex gap-2 text-gray-600">
                    <span className=" items-center flex gap-1">
                        <FontAwesomeIcon icon={faWallet} />
                        ${data.budget}
                    </span>

                    <span className=" items-center flex gap-1">
                        <FontAwesomeIcon icon={faMoneyBill1Wave} />
                        ${data.epm}/1k clicks
                    </span>

                </div>
            </div>
        </>
    )
}