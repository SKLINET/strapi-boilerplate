import { useState } from 'react';

export const useVideoFade = (enabled: boolean, loop: boolean) => {
    const [showVideo, setShowVideo] = useState(false);

    const handleVideoTimeUpdate = (time: number, totalTime: number) => {
        if (enabled && loop) {
            setShowVideo(time > 0 && time < totalTime - 1);
        } else setShowVideo(true);
    };

    return { show: showVideo, update: handleVideoTimeUpdate };
};
