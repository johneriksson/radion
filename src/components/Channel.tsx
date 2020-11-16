import React from "react";
import Button from "./Button";

import "./Channel.css"

interface Props {
    id: string,
    title: string,
    logoURL?: string,
    onPlayPauseClick: (channelId: string) => void,
    onFavoriteClick: (channelId: string) => void,
    isPlaying: boolean,
    favorite?: boolean,
}

const Channel: React.FC<Props> = ({
    id,
    title,
    onPlayPauseClick,
    onFavoriteClick,
    isPlaying,
    favorite,
}) => {

    return (
        <div className="channel">
            <div className="logo"></div>
            <div className="info">
                <h1>{title}</h1>
            </div>
            <div className="controls">
                <Button title={isPlaying ? "PAUSE" : "PLAY"} onClick={e => onPlayPauseClick(id)} />
                <Button title={favorite ? "UNSAVE" : "SAVE"} onClick={e => onFavoriteClick(id)} />
            </div>
        </div>
    );
}

export default Channel;