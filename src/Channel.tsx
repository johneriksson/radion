import React from "react";

import "./Channel.css"

interface Props {
    id: string,
    title: string,
    // streamURL: string,
    logoURL?: string,
    onPlayPauseClick: (channelId: string) => void,
    isPlaying: boolean,
}

const Channel: React.FC<Props> = ({
    id,
    title,
    onPlayPauseClick,
    isPlaying,
}) => {

    const onClick = React.useCallback(
        () => {
            onPlayPauseClick(id);
        },
        [id, onPlayPauseClick],
    );

    return (
        <div className="channel">
            <div className="logo"></div>
            <div className="info">
                <h1>{title}</h1>
            </div>
            <div className="controls">
                <button onClick={onClick}>
                    {isPlaying ? "PAUSE" : "PLAY"}
                </button>
            </div>
        </div>
    );
}

export default Channel;