import axios, { AxiosInstance, AxiosResponse } from "axios";
import {API_URL, API_TOKEN} from "@env"
import Beatmap from "../interfaces/Beatmap";

class BeatconnectService {

    private instance: AxiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
            Token: API_TOKEN
        },
        method: "GET"
    });

    public getRecentRankedBeatmaps = async (page: number): Promise<Beatmap[]> => {
        const response: AxiosResponse = await this.instance.get('search', {
            params: {
                'q': '',
                's': 'ranked',
                'p': page
            }
        });
        
        return response.data.beatmaps;
    }

}

export default new BeatconnectService();