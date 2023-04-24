import { useEffect, useState } from "react";
import { IMyCampaign } from "../../../interfaces/ViewModels";
import { GetAvailableBalanceData } from "../../../services/TransactionService";
import { toast } from "react-toastify";

interface IProps {
    item?: IMyCampaign
}

export default function Index({ item }: IProps) {

    const [available, setAvailable] = useState();
    const [budget, setBudget] = useState<Number>();

    const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newBudget = event.target.value;
        setBudget(Number(newBudget));
    }

    useEffect(() => {
        item && setBudget(item?.budget);
        GetAvailableBalanceData()
            .then(res => setAvailable(res.data))
            .catch(error => toast.error(error));
    }, [])

    return (
        <div className="flex w-full ">
            <span>Define budget: </span>
            <input className="bg-transparent ml-1 w-20 text-right" type="number" min={0} max={available} value={budget?.toString()} onChange={handleBudgetChange} />
            {available && ` / $${available}`}

        </div>
    )
}