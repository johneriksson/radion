import React from 'react';
import logo from './logo.svg';
import './App.css';
import Channel from './Channel';

const channels = [
	{ id: "bandit", title: "Bandit Rock", streamURL: "http://fm02-ice.stream.khz.se/fm02_mp3" },
	{ id: "rockklassiker", title: "Rockklassiker", streamURL: "http://tx-bauerse.sharp-stream.com/http_live.php?i=rockklassiker_instream_se_mp3" },
];

// const audios: Array<{ id: string }> = {};
// const audios = {};
// channels.forEach(channel => {
// 	const audio = new Audio(channel.streamURL);
// 	audio.volume = 0.01;
// 	audios[channel.id] = audio;
// 	// return {
// 	// 	id: channel.id,
// 	// 	audio: audio,
// 	// };	
// });

function App() {
	const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
	const [playingChannelId, setPlayingChannelId] = React.useState<string | null>(null);
	const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);

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
				newAudio.volume = 0.01;
				newAudio.play();
				setAudio(newAudio);
				setIsPlaying(true);
				setPlayingChannelId(channelId);
			}
		},
		[isPlaying, playingChannelId, audio, setAudio, setIsPlaying, setPlayingChannelId]
	);
	
	return (
		<div className="App">
			<header className="App-header">
			</header>
			<div className="App-main">
				{channels.map(channel => (
					<Channel
						key={channel.id}
						onPlayPauseClick={onPlayPauseClick}
						isPlaying={playingChannelId === channel.id && isPlaying === true}
						{...channel}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
