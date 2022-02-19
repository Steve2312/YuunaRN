import { useEffect, useState } from "react";
import { AppState } from "react-native";
import { AppStateStatus } from "react-native";
import PreviewPlayer from '../services/PreviewPlayer';

const usePreviewService = () => {
    const [state, setState] = useState(PreviewPlayer.getState());

    const handleAppStateChange = (state: AppStateStatus) => {
        if (state == "inactive" || state == "background") {
            PreviewPlayer.pause();
        }
    }

    useEffect(() => {
        PreviewPlayer.registerObserver(setState);
        
        const event = AppState.addEventListener("change", handleAppStateChange);

        return () => {
            PreviewPlayer.unregisterObserver(setState);
            event.remove();
        }
    },[])

    return [state]
}

export default usePreviewService;