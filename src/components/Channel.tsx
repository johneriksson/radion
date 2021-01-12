import React from "react";
import Button from "./Button";

import "./Channel.css";

interface Props {
    id: number,
    title: string,
    logoURL?: string,
    onPlayPauseClick: (channelId: number) => void,
    // onFavoriteClick: (channelId: number) => void,
    isPlaying: boolean,
    favorite?: boolean,
}

const Channel: React.FC<Props> = ({
    id,
    title,
    onPlayPauseClick,
    // onFavoriteClick,
    isPlaying,
    favorite,
}) => {

    return (
        <div className="channel card-2">
            <div className="logo"></div>
            <div className="info">
                <h1>{title}</h1>
            </div>
            <div className="controls">
                <Button title={isPlaying ? "PAUSE" : "PLAY"} onClick={e => onPlayPauseClick(id)} />
                {/* <Button title={favorite ? "UNSAVE" : "SAVE"} onClick={e => onFavoriteClick(id)} /> */}
            </div>
        </div>
    );
}

export default Channel;