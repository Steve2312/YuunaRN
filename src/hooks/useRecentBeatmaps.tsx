import React, {useState} from "react";
import Beatmap from '../interfaces/Beatmap';
import BeatconnectService from "../services/BeatconnectService";

const useRecentBeatmaps = (): [Beatmap[], boolean, Function] => {

    const [page, setPage] = useState<number>(0); 
    const [fetching, setFetching] = useState<boolean>(false); 
    const [beatmaps, setBeatmaps] = useState<Beatmap[]>([]);

    const fetch = () => {
        if (!fetching) {
            setFetching(true);

            BeatconnectService.getRecentRankedBeatmaps(page).then(newBeatmaps => {
                const exisitingBeatmapIDs = beatmaps.map(beatmap => beatmap.id);
                const filteredNewBeatmaps = newBeatmaps.filter(newBeatmap => !exisitingBeatmapIDs.includes(newBeatmap.id))
                setBeatmaps([...beatmaps, ...filteredNewBeatmaps]);
                setPage(page + 1);
                setFetching(false);
            });
        }
    }

    return [beatmaps, fetching, fetch];
}

export default useRecentBeatmaps;