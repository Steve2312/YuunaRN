import { AxiosResponse } from "axios";
import React, {useEffect, useState} from "react";
import Beatconnect from '../config/Beatconnect';
import useVariable from './useVariable';
import Beatmap from '../interfaces/Beatmap';

const useRecentlyAddedBeatmaps = (): [Beatmap[], Function] => {
    const status = "ranked";
    const query = "";

    const [isFetching, setFetching] = useVariable<boolean>(false);
    const [isPageEnd, setPageEnd] = useVariable<boolean>(false);
    const [getPage, setPage] = useVariable<number>(0);

    const [results, setResults] = useState([]); 

    const fetch = async () => {
        if (isFetching() || isPageEnd()) {
            return;
        }

        setFetching(true);

        const response: AxiosResponse = await Beatconnect.get('search', {
            params: {
                'q': query,
                's': status,
                'p': getPage()
            }
        });

        const data = response.data.beatmaps;

        setPageEnd(data.length == 0);
        setPage(getPage() + 1);
        setFetching(false);

        setResults([...results, ...data]);
    }

    return [results, fetch];
}

export default useRecentlyAddedBeatmaps;