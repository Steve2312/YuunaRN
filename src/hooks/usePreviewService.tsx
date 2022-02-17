import { useEffect, useState } from "react";
import PreviewService from '../services/PreviewService';

const usePreviewService = () => {
    const [state, setState] = useState(PreviewService.getObject());

    useEffect(() => {
        PreviewService.registerObserver(setState);

        return () => {
            PreviewService.unregisterObserver(setState);
        }
    },[])

    return [state]
}

export default usePreviewService;