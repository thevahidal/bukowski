import { useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });


const VideoRenderer = () => {

    const [ready, setReady] = useState(false);
    const [video, setVideo] = useState();

    const load = async () => {
        await ffmpeg.load();
        setReady(true);
    };

    useEffect(() => {
        load();
    }, []);

    const convertToVideo = async () => {
        // render typing capturer to video
        await ffmpeg.run('-video_size', '1024x768', '-framerate', '25', '-f', 'x11grab', '-i', ':0.0+100,200', 'output.mp4');
    }

    return (
        <button
            className='button'
            onClick={convertToVideo}
            disabled={!ready}
        >
            Export Video
        </button>
    )
}

export default VideoRenderer