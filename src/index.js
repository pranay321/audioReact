import React from "react";
import { render } from "react-dom";

class Audio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: null
    };
  }

  handlePlay() {
    this.audio.play();
  }

  handleStop() {
    this.audio.currentTime = 0;
    this.slider.value = 0;
    this.audio.pause();
  }

  componentDidMount() {
    this.slider.value = 0;
    this.currentTimeInterval = null;

    // Get duration of the song and set it as max slider value
    this.audio.onloadedmetadata = function() {
      this.setState({ duration: this.audio.duration });
    }.bind(this);

    // Sync slider position with song current time
    this.audio.onplay = () => {
      this.currentTimeInterval = setInterval(() => {
        this.slider.value = this.audio.currentTime;
      }, 500);
    };

    this.audio.onpause = () => {
      clearInterval(this.currentTimeInterval);
    };

    // Seek functionality
    this.slider.onchange = e => {
      clearInterval(this.currentTimeInterval);
      this.audio.currentTime = e.target.value;
    };
  }

  render() {
    const src =
      "https://files.freemusicarchive.org/music%2Fno_curator%2FThe_Womb%2FBang_-_An_Introduction_to_The_Womb%2FThe_Womb_-_02_-_Sex_Club.mp3";

    return (
      <div>
        <audio
          ref={audio => {
            this.audio = audio;
          }}
          src={src}
        />

        <input
          type="button"
          value="Play"
          onClick={this.handlePlay.bind(this)}
        />

        <input
          type="button"
          value="Stop"
          onClick={this.handleStop.bind(this)}
        />

        <p>
          <input
            ref={slider => {
              this.slider = slider;
            }}
            type="range"
            name="points"
            min="0"
            max={this.state.duration}
          />{" "}
        </p>
      </div>
    );
  }
}
const App = () => (
  <div>
    <Audio />
    <h2>Start editing to see some magic happen {"\u2728"}</h2>
  </div>
);

render(<App />, document.getElementById("root"));
