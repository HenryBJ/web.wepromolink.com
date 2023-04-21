import { ICampaignListResponse, IMyCampaignsResponse } from "../../interfaces/Responses";
import { IMyCampaignStats } from "../../interfaces/ViewModels";


export const campaignToFeedList: ICampaignListResponse =
{
    page: 0,
    totalPages: 1,
    sponsoredLinks: [
        {
            budget: 0.003,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam aliquam voluptatum atque? Maiores veniam placeat accusantium aliquid nisi vel in esse, commodi laborum explicabo soluta eius nihil earum corporis quibusdam.",
            epm: 15,
            imageUrl: "https://wepromolink.com/card.png",
            title: "WePromoLink",
            id: "qefqefqwef",
            autorImageUrl: "https://wepromolink.com/card.png",
            autorName: "Jose Enrique"
        },
        {
            budget: 0.003,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            epm: 15,
            imageUrl: "https://wepromolink.com/card.png",
            title: "WePromoLink",
            id: "qweqweqwe",
            autorImageUrl: "https://wepromolink.com/card.png",
            autorName: "Jose Enrique"
        },
        {
            budget: 0.003,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam aliquam voluptatum atque? Maiores veniam placeat accusantium aliquid nisi vel in esse, commodi laborum explicabo soluta eius nihil earum corporis quibusdam.",
            epm: 15,
            imageUrl: "https://www.lunanode.com/images/moon-by-itself.png",
            title: "WePromoLink",
            id: "adfadfafadqefqwef",
            autorImageUrl: "https://wepromolink.com/card.png",
            autorName: "Jose Enrique"
        },
        {
            budget: 0.003,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam aliquam voluptatum atque? Maiores veniam placeat accusantium aliquid nisi vel in esse.",
            epm: 15,
            imageUrl: "https://wepromolink.com/card.png",
            title: "WePromoLink",
            id: "adfadfefqwef",
            autorImageUrl: "https://wepromolink.com/card.png",
            autorName: "Jose Enrique"
        },
        {
            budget: 0.003,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam aliquam voluptatum atque? Maiores veniam placeat accusantium aliquid nisi vel in esse, commodi laborum explicabo soluta eius nihil earum corporis quibusdam.",
            epm: 15,
            imageUrl: "https://henrydeveloper.com/images/tcard.png",
            title: "WePromoLink",
            id: "adfafqwef",
            autorImageUrl: "https://wepromolink.com/card.png",
            autorName: "Jose Enrique"
        },
        {
            budget: 0.003,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam aliquam voluptatum atque? Maiores veniam placeat accusantium aliquid nisi vel in esse, commodi laborum explicabo soluta eius nihil earum corporis quibusdam.",
            epm: 15,
            imageUrl: "https://wepromolink.com/card.png",
            title: "WePromoLink",
            id: "afafsffqwef",
            autorImageUrl: "https://wepromolink.com/card.png",
            autorName: "Jose Enrique"
        },
    ]
};

export const myCampaingList: IMyCampaignsResponse = {
    pagination: { cant: 44, page: 1, totalPages: 44, lastPage: 50 },
    items: [
        { id: "1", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "2", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "3", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: false, budget: 0, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "4", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "5", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "6", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: false, budget: 0, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "7", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "8", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "9", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "10", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "11", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "12", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "13", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "14", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "15", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "16", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "17", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "18", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "19", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "20", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "21", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "22", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "23", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "24", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "25", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "26", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "27", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "28", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "29", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "30", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "31", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "32", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "33", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "34", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "35", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "36", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "37", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "38", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "39", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "40", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "41", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "42", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "43", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
        { id: "44", title: "HenryDeveloper", url: "https://henrydeveloper.com", status: true, budget: 95, epm: 15, lastClick: new Date(), lastShared: new Date() },
    ]
}


export const CampaingStatsMock:IMyCampaignStats = {
    id: '1',
    title: 'HenryDeveloper',
    imageUrl: 'https://wepromolink.com/card.png',
    lastWeekClicks:200,
    sharedLastWeekOnCampaings: 100,
    sharedTodayOnCampaings:30,
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
    historicalShared:{
        title:'Shares',
        labels:['Alemania', 'Estados Unidos', 'Cuba', 'Republica Dominicana','Canada','Uruguay'],
        data:[[23,45,63,43,77,22],[78,10,54,1,200,43]],
        dataLabels:['Yesterday','Today']
    },
    sharedByUsers:{
        title:'Shared by Users',
        labels:['Alemania', 'Estados Unidos', 'Cuba', 'Republica Dominicana','Canada','Uruguay'],
        data:[[23,45,63,43,77,22],[78,10,54,1,200,43]],
        dataLabels:['Yesterday','Today']
    }
}