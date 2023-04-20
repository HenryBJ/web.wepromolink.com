import { IStats } from "../../components/DashBar";
import { ISubscriptionResponse } from "../../interfaces/Responses";


 export  const stats:IStats = {
    title:'Clicks by Countries',
    labels:['Alemania', 'Estados Unidos', 'Cuba', 'Republica Dominicana','Canada','Uruguay'],
    data:[[23,45,63,43,77,22],[78,10,54,1,200,43]],
    dataLabels:['Yesterday','Today']
};