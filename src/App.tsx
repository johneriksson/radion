import React from 'react';
import logo from './logo.svg';
import './App.css';

const banditRock = new Audio("http://fm02-ice.stream.khz.se/fm02_mp3");
banditRock.volume = 0.05;
const rockKlassiker = new Audio("http://tx-bauerse.sharp-stream.com/http_live.php?i=rockklassiker_instream_se_mp3");
rockKlassiker.volume = 0.05;

function App() {
  const [playing, setPlaying] = React.useState(false);
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="App-main">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          <button
            onClick={() => {
              setPlaying(!playing);
              if (!playing) {
                banditRock.play()
              } else {
                banditRock.pause()
              }
            }}
          >
            {playing ? "PAUSE" : "PLAY"} BANDIT
          </button>

          <button
            onClick={() => {
              setPlaying(!playing);
              if (!playing) {
                rockKlassiker.play()
              } else {
                rockKlassiker.pause()
              }
            }}
          >
            {playing ? "PAUSE" : "PLAY"} ROCKKLASSIKER
          </button>
        </p>
      </div>
    </div>
  );
}

export default App;
