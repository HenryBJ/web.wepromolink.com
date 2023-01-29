import { apiRequest } from "..";

export function GetCampaigns(){
    return apiRequest.get("links")
}