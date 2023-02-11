import { AxiosResponse } from "axios";
import { apiRequest } from "..";
import { ICampaignListResponse } from "../../interfaces/ICampaingCard";

export function GetCampaigns(page:Number) {
    let mock = process.env.REACT_APP_STAGE_MOCK_WEPROMOLINK;
    if (mock === "1") {
        return new Promise(function (resolve:(value:AxiosResponse|any)=>void, reject) {
            let resultado = true;

            if (resultado) {
                setTimeout(() => {
                    resolve({ data: mockObj });
                },5000);
            } else {
                reject("La operación falló");
            }
        });
    }
    else {
        return apiRequest.get(`links?page=${page}`)
    }
}

let mockObj:ICampaignListResponse = 
    {
        page:0,
        totalPages:1,
        sponsoredLinks:[
            {
                budget: 0.003,
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam aliquam voluptatum atque? Maiores veniam placeat accusantium aliquid nisi vel in esse, commodi laborum explicabo soluta eius nihil earum corporis quibusdam.",
                epm: 15,
                imageUrl: "https://wepromolink.com/card.png",
                title: "WePromoLink",
                id: "qefqefqwef",
                autorImageUrl:"https://wepromolink.com/card.png",
                autorName:"Jose Enrique"
            },
            {
                budget: 0.003,
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                epm: 15,
                imageUrl: "https://wepromolink.com/card.png",
                title: "WePromoLink",
                id: "qweqweqwe",
                autorImageUrl:"https://wepromolink.com/card.png",
                autorName:"Jose Enrique"
            },
            {
                budget: 0.003,
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam aliquam voluptatum atque? Maiores veniam placeat accusantium aliquid nisi vel in esse, commodi laborum explicabo soluta eius nihil earum corporis quibusdam.",
                epm: 15,
                imageUrl: "https://www.lunanode.com/images/moon-by-itself.png",
                title: "WePromoLink",
                id: "adfadfafadqefqwef",
                autorImageUrl:"https://wepromolink.com/card.png",
                autorName:"Jose Enrique"
            },
            {
                budget: 0.003,
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam aliquam voluptatum atque? Maiores veniam placeat accusantium aliquid nisi vel in esse.",
                epm: 15,
                imageUrl: "https://wepromolink.com/card.png",
                title: "WePromoLink",
                id: "adfadfefqwef",
                autorImageUrl:"https://wepromolink.com/card.png",
                autorName:"Jose Enrique"
            },
            {
                budget: 0.003,
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam aliquam voluptatum atque? Maiores veniam placeat accusantium aliquid nisi vel in esse, commodi laborum explicabo soluta eius nihil earum corporis quibusdam.",
                epm: 15,
                imageUrl: "https://henrydeveloper.com/images/tcard.png",
                title: "WePromoLink",
                id: "adfafqwef",
                autorImageUrl:"https://wepromolink.com/card.png",
                autorName:"Jose Enrique"
            },
            {
                budget: 0.003,
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam aliquam voluptatum atque? Maiores veniam placeat accusantium aliquid nisi vel in esse, commodi laborum explicabo soluta eius nihil earum corporis quibusdam.",
                epm: 15,
                imageUrl: "https://wepromolink.com/card.png",
                title: "WePromoLink",
                id: "afafsffqwef",
                autorImageUrl:"https://wepromolink.com/card.png",
                autorName:"Jose Enrique"
            },
        ]
    };

