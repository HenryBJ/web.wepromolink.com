import { useEffect, useState } from "react";
import { IMyCampaign } from "../../../interfaces/ViewModels";
import { GetAvailableBalanceData } from "../../../services/TransactionService";
import { toast } from "react-toastify";

interface IProps {
    item?: IMyCampaign
}

export default function Index({ item }: IProps) {

    const [available, setAvailable] = useState();

    useEffect(() => {
        GetAvailableBalanceData()
            .then(res => setAvailable(res.data))
            .catch(error => toast.error(error));
    }, [])

    return (
        <div className="flex w-full ">
            <span>{`Define budget: $${item?.budget} / $${available}`}</span>

        </div>
    )
}