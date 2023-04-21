import { ICreateAffLinkResponse, IMyAffLinksResponse } from "../../interfaces/Responses";
import { IMyAffLinkStats } from "../../interfaces/ViewModels";

export const  AffLinkMock: ICreateAffLinkResponse =
{
    id: "Kwxo3pH5Vxq2b-dX",
    link: "https://api.wepromolink.com/Kwxo3pH5Vxq2b-dX"
};

export const myAffLinkList: IMyAffLinksResponse = {
    pagination: { cant: 44, page: 1, totalPages: 44, lastPage:50},
    items: [
        { id: "1", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "2", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "3", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "4", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "5", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "6", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "7", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "8", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "9", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "10", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "11", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "12", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "13", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "14", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "15", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "16", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "17", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "18", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "19", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "20", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "21", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "22", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "23", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "24", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "25", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "26", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "27", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "28", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "29", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "30", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "31", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "32", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "33", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "34", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "35", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },
        { id: "36", title: "HenryDeveloper", url: "https://henrydeveloper.com", lastClick: new Date(), available: 343  },

           ]
}


export const AffLinkStatsMock:IMyAffLinkStats = {
    id: '1',
    title: 'HenryDeveloper',
    imageUrl: 'https://wepromolink.com/card.png',
    lastWeekClicks:200,
    todayClicks:33,
    clickByCountries:{
        title:'Clicks by Countries',
        labels:['Alemania', 'Estados Unidos', 'Cuba', 'Republica Dominicana','Canada','Uruguay'],
        data:[[23,45,63,43,77,22],[78,10,54,1,200,43]],
        dataLabels:['Yesterday','Today']
    },
    historicalClicks:{
        title:'Clicks',
        labels:['Alemania', 'Estados Unidos', 'Cuba', 'Republica Dominicana','Canada','Uruguay'],
        data:[[23,45,63,43,77,22],[78,10,54,1,200,43]],
        dataLabels:['Yesterday','Today']
    },
    earnLastWeek:100,
    earnToday:456,
    earnByCountries:{
        title:'Clicks',
        labels:['Alemania', 'Estados Unidos', 'Cuba', 'Republica Dominicana','Canada','Uruguay'],
        data:[[23,45,63,43,77,22],[78,10,54,1,200,43]],
        dataLabels:['Yesterday','Today']
    },
    historicalEarn:{
        title:'Clicks',
        labels:['Alemania', 'Estados Unidos', 'Cuba', 'Republica Dominicana','Canada','Uruguay'],
        data:[[23,45,63,43,77,22],[78,10,54,1,200,43]],
        dataLabels:['Yesterday','Today']
    }
    
    
}