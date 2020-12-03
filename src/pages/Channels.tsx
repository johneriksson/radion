import React from "react";
// import "./Channels.css";
import Channel from "../components/Channel";
import { useChannelsQuery } from "../generated/graphql";

const defaultChannels = [
	{ id: "bandit", title: "Bandit Rock", streamURL: "http://fm02-ice.stream.khz.se/fm02_mp3", favorite: true },
	{ id: "rockklassiker", title: "Rockklassiker", streamURL: "http://tx-bauerse.sharp-stream.com/http_live.php?i=rockklassiker_instream_se_mp3" },
	{ id: "nrj", title: "NRJ", streamURL: "http://tx-bauerse.sharp-stream.com/http_live.php?i=nrj_instreamtest_se_mp3" },
	{ id: "mix-megapol", title: "Mix Megapol", streamURL: "http://tx-bauerse.sharp-stream.com/http_live.php?i=mixmegapol_instream_se_mp3	" },
	{ id: "mix-megapol-gbg", title: "Mix Megapol Göteborg", streamURL: "http://tx-bauerse.sharp-stream.com/http_live.php?i=mixmegapolgbg_instream_se_mp3" },
	{ id: "svensk-pop", title: "Svensk Pop", streamURL: "http://tx-bauerse.sharp-stream.com/http_live.php?i=svenskpop_se_mp3" },
	{ id: "vinyl-fm", title: "Vinyl FM", streamURL: "http://tx-bauerse.sharp-stream.com/http_live.php?i=vinylfm_instream_se_mp3" },
	{ id: "lugna-klassiker", title: "Lugna Klassiker", streamURL: "https://live-bauerse-fm.sharp-stream.com/lugnaklassiker_instream_se_mp3" },
	// { id: "radio-1075", title: "Radio 107,5", streamURL: "https://live-bauerse-online.sharp-stream.com/749_se_mp3" },
	// { id: "schlagerstationen", title: "Schlagerstationen", streamURL: "https://live-bauerse-online.sharp-stream.com/169_se_mp3" },
	{ id: "retro-fm", title: "Retro FM", streamURL: "https://live-bauerse-fm.sharp-stream.com/retrofm_mp3" },
];

function Channels() {
	const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
	const [playingChannelId, setPlayingChannelId] = React.useState<string | null>(null);
	const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
	const [channels, setChannels] = React.useState(defaultChannels);

	const onPlayPauseClick = React.useCallback(
		(channelId: string) => {
			if (channelId === playingChannelId) {
				if (isPlaying) {
					setIsPlaying(false);
					audio?.pause();
				} else {
					setIsPlaying(true);
					audio?.play();
				}
			} else {
				audio?.pause();
				const channel = channels.find(c => c.id === channelId);
				const newAudio = new Audio(channel?.streamURL);
				newAudio.volume = 0.1;
				newAudio.play();
				setAudio(newAudio);
				setIsPlaying(true);
				setPlayingChannelId(channelId);
			}
		},
		[channels, isPlaying, playingChannelId, audio, setAudio, setIsPlaying, setPlayingChannelId]
	);

	const onFavoriteClick = React.useCallback(
		(channelId: string) => {
			const index = channels.findIndex(c => c.id === channelId);
			if (index >= 0) {
				const channel = { ...channels[index] };
				channel.favorite = !channel?.favorite;
				const newChannels = [...channels];
				newChannels.splice(index, 1, channel);
				setChannels(newChannels);
			}
		},
		[channels, setChannels]
	);

	const [{data}] = useChannelsQuery();

	return (
		<div>
			{!data && <div>Loading channels...</div>}
			{data?.channels.map(p => (
				<div key={p.id}>{p.title}</div>
			))}
			{channels.map(channel => (
				<Channel
					key={channel.id}
					onPlayPauseClick={onPlayPauseClick}
					onFavoriteClick={onFavoriteClick}
					isPlaying={playingChannelId === channel.id && isPlaying === true}
					{...channel}
				/>
			))}
		</div>
	);
}

export default Channels;
