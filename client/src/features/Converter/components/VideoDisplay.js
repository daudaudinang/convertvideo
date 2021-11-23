import React, { useRef, useState, useEffect } from 'react';
import PlayerControls from './PlayerControls';
import Hls from 'hls.js';
import Dash from 'dashjs';

const format = (seconds) => {
  if(isNaN(seconds)) {
    return '00:00';
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2,"0");
  if(hh){
    return `${hh}:${mm.toString().padStart(2,"0")}:${ss}`
  }

  return `${mm}:${ss}`;
}

let count = 0;
var hls = null;
var dash = null;
var setting = null;
let countInterval = 0;

function VideoDisplay({video}) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [fullScreen, setFullScreen] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [played, setPlayed] = useState(0);
  const [buffered, setBuffered] = useState(0);

  const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal");
  const [activePip, setActivePip] = useState(false);
  const [quality_array, setQualityArray] = useState([]);

  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const controlsRef = useRef(null);

  // Setup giá trị mặc định cho video Element
  useEffect(() => {
    window.onload = function(){
      const videoElement = document.querySelector('video');
      videoElement.autoplay = false;
      videoElement.controls = false;
      videoElement.muted = false;
      videoElement.defaultPlaybackRate = 1;
      videoElement.volume = 0.5;
      videoElement.loop = false;  

      videoElement.onended = () => {
        setPlaying(false);
        videoElement.pause();
      } // Tức là mình đang khai báo trước cho thằng videoElement 1 tác vụ, khi nó kết thúc thì thực hiện hàm này
      // Chứ không phải là khi sự kiện kết thúc xảy ra thì mới bắt đầu gọi hàm này
    }
  }, []);

  // Xử lý khi thay đổi video
  useEffect(() => {
    // Set state về mặc định
    setPlaying(false);
    setMuted(false);
    setVolume(0.5);
    setPlaybackRate(1.0);
    setFullScreen(false);
    setPlayed(0);
    setQualityArray([]);
    
    const videoElement = document.querySelector('video');

    // Set video Element về ban đầu

    // Xử lý nếu đầu vào nhận được là video hls hoặc video dash
    // Phân giải url video để lấy định dạng
    const videoType = video.split('.').pop();
      switch(videoType) {
        case 'mp4':
          if(hls) hls.destroy();
          if(dash) dash.destroy();
          clearInterval(countInterval);
          videoElement.src = video;
          break;
        case 'm3u8':
          clearInterval(countInterval);
          if(hls) hls.destroy();
          if(dash) dash.destroy();
          hls = new Hls();
          hls.attachMedia(videoElement);
          hls.on(Hls.Events.MEDIA_ATTACHED, function() {
            hls.loadSource(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function(event, data){
              const array_tmp = data.levels.filter(oneLevel => (oneLevel.codecSet !== "")).map(oneLevel => oneLevel.height);
              if(array_tmp.length > 0){
                setQualityArray(array_tmp);                
              } else {
                hls.destroy();
                console.log("Codec không hỗ trợ");
              }
            });

          });
          break;
        case 'mpd':
          clearInterval(countInterval);
          if(hls) hls.destroy();
          if(dash) dash.destroy();
          dash = Dash.MediaPlayer().create();
          dash.initialize(videoElement, video, false);
          dash.on(Dash.MediaPlayer.events['PLAYBACK_METADATA_LOADED'], function(e){
            if(dash.getTracksFor('video').length > 0){
              setQualityArray(dash.getTracksFor('video')[0].bitrateList.map(oneLevel => oneLevel.height));
            } else {
              dash.destroy();
              console.log("Codec không hỗ trợ!");
            }
          })
          break;
      }
  }, [video]);

  // Play/ pause
  const togglePlay = () => {
    const videoElement = playerRef.current;
    if(playing === false) {
      videoElement.play();
      countInterval = setInterval(() => {
        if(controlsRef.current){
          if(count > 3){
            controlsRef.current.style.visibility = "hidden";
            count = 0;
          }
      
          if(controlsRef.current.style.visibility === "visible") {
            count = count + 1;
          }
      
          if(seeking === false) {
            setPlayed(videoElement.currentTime / videoElement.duration);
            if(videoElement.buffered.length > 0){
              setBuffered(videoElement.buffered.end(0) / videoElement.duration);
            }
          }
        } else {
          clearInterval(countInterval);
        }   
      }, 1000);
    } else {
      clearInterval(countInterval);
      videoElement.pause();
    }
    setPlaying(!playing);
  }

  // Tua ngược
  const handleRewind = () => {
    playerRef.current.currentTime -= 5;
  }

  // Tua tới
  const handleForward = () => {
    playerRef.current.currentTime += 5;
  }

  // Tắt âm
  const toggleMute = () => {
    playerRef.current.muted = !muted;
    setMuted(!muted);
  }

  const changeVolume = (event) => {
    setMuted(false);
    playerRef.current.volume = Number(event.target.value) / 100;
    setVolume(Number(event.target.value) / 100);
  }

  const changePlaybackRate = (rate) => {
    playerRef.current.playbackRate = Number(rate);
    setPlaybackRate(Number(rate));
  }

  const changeQuality = (index) => {
    if(hls && hls.currentLevel !== index) hls.currentLevel = index;
    else if(dash && dash.getQualityFor("video") !== index) {
      dash.getSettings().streaming.abr.autoSwitchBitrate.video = false;
      dash.setQualityFor("video", index, true);
    }
  }

  const toggleFullScreen = () => {
    if(fullScreen === false) containerRef.current.requestFullscreen();
    else containerRef.current.exitFullscreen();
    setFullScreen(!fullScreen);
  }

  // Thao tác nhấn giữ chuột ở thanh timeline
  const handleSeekMouseDown = (e) => {
    setSeeking(true);
  }

  // Thao tác thả chuộ ra ở vị trí mới
  const handleSeekMouseUp = (e, newValue) => {
    setSeeking(false);
    setPlayed(parseFloat(newValue / 100));
    playerRef.current.currentTime = (newValue/100) * playerRef.current.duration;
  }

  const handleChangeDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat==='normal'? 'remaining' : 'normal'
    );
  }

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const toggleActivePip = () => {
    if(activePip === false) {
      playerRef.current.requestPictureInPicture();
    } else {
      document.exitPictureInPicture();
    }
    setActivePip(!activePip);
    if(fullScreen) toggleFullScreen();
  }

  const currentTime = playerRef.current ? playerRef.current.currentTime : "00:00";
  const duration = playerRef.current ? playerRef.current.duration : "00:00";
  
  const elapsedTime = (timeDisplayFormat === "normal") ? format(currentTime) : `-${format(duration - currentTime)}`;
  const totalDuration = format(duration);

  return (
    <div className="main-container">
      <div 
        ref={containerRef} 
        className="video-container"
        onMouseMove={handleMouseMove}
      >
        <div className="video-wrapper">
          <video
            ref={playerRef}
            style={{width:"inherit", height:"inherit", borderRadius:"15px"}}
          >
          </video>
        <canvas id="canvas" width="320" height="180"></canvas>
          <PlayerControls  
            ref={controlsRef}
            togglePlay={togglePlay}
            playing={playing}
            handleRewind={handleRewind}
            handleForward={handleForward}
            muted={muted}
            toggleMute={toggleMute}
            volume={volume}
            changeVolume={changeVolume}
            playbackRate={playbackRate}
            changePlaybackRate={changePlaybackRate}
            changeQuality={changeQuality}
            fullScreen={fullScreen}
            toggleFullScreen={toggleFullScreen}
            played={played}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMouseUp}
            elapsedTime={elapsedTime}
            totalDuration={totalDuration}
            onChangeDisplayFormat={handleChangeDisplayFormat}
            toggleActivePip={toggleActivePip}
            quality_array={quality_array}
            buffered={buffered}
          />
        </div>
      </div>
    </div>
  );
}

export default VideoDisplay;