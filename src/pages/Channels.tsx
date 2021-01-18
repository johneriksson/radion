import React from "react";

import Button from "../components/Button";
import Channel from "../components/Channel";
import { useChannelsQuery } from "../generated/graphql";

// const defaultChannels = [
// 	{ id: "bandit", title: "Bandit Rock", streamURL: "http://fm02-ice.stream.khz.se/fm02_mp3", favorite: true },
// 	{ id: "rockklassiker", title: "Rockklassiker", streamURL: "http://tx-bauerse.sharp-stream.com/http_live.php?i=rockklassiker_instream_se_mp3" },
// 	{ id: "nrj", title: "NRJ", streamURL: "http://tx-bauerse.sharp-stream.com/http_live.php?i=nrj_instreamtest_se_mp3" },
// 	{ id: "mix-megapol", title: "Mix Megapol", streamURL: "http://tx-bauerse.sharp-stream.com/http_live.php?i=mixmegapol_instream_se_mp3	" },
// 	{ id: "mix-megapol-gbg", title: "Mix Megapol Göteborg", streamURL: "http://tx-bauerse.sharp-stream.com/http_live.php?i=mixmegapolgbg_instream_se_mp3" },
// 	{ id: "svensk-pop", title: "Svensk Pop", streamURL: "http://tx-bauerse.sharp-stream.com/http_live.php?i=svenskpop_se_mp3" },
// 	{ id: "vinyl-fm", title: "Vinyl FM", streamURL: "http://tx-bauerse.sharp-stream.com/http_live.php?i=vinylfm_instream_se_mp3" },
// 	{ id: "lugna-klassiker", title: "Lugna Klassiker", streamURL: "https://live-bauerse-fm.sharp-stream.com/lugnaklassiker_instream_se_mp3" },
// 	{ id: "retro-fm", title: "Retro FM", streamURL: "https://live-bauerse-fm.sharp-stream.com/retrofm_mp3" },
// ];

function Channels() {
	const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
	const [playingChannelId, setPlayingChannelId] = React.useState<number | null>(null);
	const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);

	const [variables, setVariables] = React.useState({
		limit: 2,
		cursor: null as null | string,
	});
	const [{ data, fetching, stale }] = useChannelsQuery({
		variables,
	});

	const isLoading = fetching || stale;

	const onPlayPauseClick = React.useCallback(
		(channelId: number) => {
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
				const channel = data?.channels.items.find(c => c.id === channelId);
				const newAudio = new Audio(channel?.streamURL);
				newAudio.volume = 0.1;
				newAudio.play();
				setAudio(newAudio);
				setIsPlaying(true);
				setPlayingChannelId(channelId);
			}
		},
		[data, isPlaying, playingChannelId, audio, setAudio, setIsPlaying, setPlayingChannelId]
	);

	return (
		<div>
			{!data && <div>Loading channels...</div>}
			{data?.channels.items.map(channel => (
				<Channel
					key={channel.id}
					onPlayPauseClick={onPlayPauseClick}
					isPlaying={playingChannelId === channel.id && isPlaying === true}
					{...channel}
				/>
			))}
			{data?.channels.hasMore && (
				<Button
					title={isLoading ? "Loading more..." : "Load more"}
					onClick={() => {
						setVariables({
							limit: variables.limit,
							cursor: data.channels.items[data.channels.items.length - 1].createdAt,
						})
					}}
					disabled={isLoading}
				/>
			)}
		</div>
	);
}

export default Channels;
