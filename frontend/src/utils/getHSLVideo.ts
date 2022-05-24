import Hls from 'hls.js';

export default function getHLSVideo(url: string | undefined, target: HTMLVideoElement) {
    if (url) {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(target);
        } else if (target.canPlayType('application/vnd.apple.mpegurl')) {
            target.src = url;
        }
    }
}
