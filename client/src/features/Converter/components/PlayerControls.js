import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import HighQualityIcon from "@mui/icons-material/HighQuality";
import PauseIcon from "@mui/icons-material/Pause";
import PictureInPictureAltIcon from "@mui/icons-material/PictureInPictureAlt";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import {
  Button, Grid, IconButton, Typography
} from "@mui/material";
import Popover from "@mui/material/Popover";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React, { forwardRef } from "react";

const useStyles = makeStyles({
  color: "#ffffff",
  controlIcons: {
    fontSize: 50,
    transform: "scale(0.9)",
    "&:hover": {
      color: "#7520bb",
      transform: "scale(1)",
    },
  },
  middleIcons: {
    color: "#ffffff",
    "&:hover" : {
      color: "#7520bb",
      transform: "scale(1.5)"
    }
  },
  bottomIcons: {
    color: "#ffffff",
    "&:hover": {
      color: "#7520bb",
      transform: "scale(1.5)",
    },
  },
});

const PrettoSlider = styled(Slider)({
  color: "#ffffff",
  padding: 0,
  height: 6,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 10,
    width: 14,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 10,
    height: 10,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

export default forwardRef((props, ref) => {
    const {
      togglePlay, 
      playing, 
      handleRewind, 
      handleForward, 
      muted, 
      toggleMute, 
      volume, 
      changeVolume, 
      playbackRate, 
      changePlaybackRate, 
      changeQuality,
      fullScreen, 
      toggleFullScreen,
      played,
      onSeekMouseDown,
      onSeekMouseUp,
      elapsedTime,
      totalDuration,
      onChangeDisplayFormat,
      quality_array,
      toggleActivePip
    } = props;

    const classes = useStyles();

    const [anchorEl1, setAnchorEl1] = React.useState(null);
  
    const handlePopover1 = (event) => {
      setAnchorEl1(event.currentTarget);
    };
  
    const handleClose1 = () => {
      setAnchorEl1(null);
    };
  
    const open1 = Boolean(anchorEl1);
    const id1 = open1 ? 'playbackrate-popover' : undefined;

    const [anchorEl2, setAnchorEl2] = React.useState(null);
  
    const handlePopover2 = (event) => {
      setAnchorEl2(event.currentTarget);
    };
  
    const handleClose2 = () => {
      setAnchorEl2(null);
    };
  
    const open2 = Boolean(anchorEl2);
    const id2 = open2 ? 'playbackrate-popover' : undefined;

    return (
        <div className="control-wrapper" ref={ref}>
            <div className="top-control">
            <Typography variant="h5" style={{ color: "#ffffff" }}>
      
            </Typography>
            </div>
            <div className="medium-control">
              <div className="medium-left" onClick={handleRewind}>
                <FastRewindIcon fontSize="large" className={classes.middleIcons}/>
              </div>
              <div className="medium-center" onClick={togglePlay}>
                {playing ? <PauseIcon fontSize="large" className={classes.middleIcons}/> : <PlayArrowIcon fontSize="large" className={classes.middleIcons}/>}
              </div>
              <div className="medium-right" onClick={handleForward}>
                <FastForwardIcon fontSize="large" className={classes.middleIcons}/>
              </div>
            </div>

            <div className="bottom-control">
            <div className="slider">
                <PrettoSlider onMouseDown={onSeekMouseDown} onChangeCommitted={onSeekMouseUp}
                  size="small"
                  min={0}
                  max={100}
                  aria-label="slide"
                  value={played * 100}
                />
            </div>
            <div className="control">
                <div className="left-container">
                <IconButton onClick={togglePlay} className={classes.bottomIcons} aria-label="play">
                    {playing ? <PauseIcon fontSize="inherit"  style={{ color: "#ffffff"}}/> : <PlayArrowIcon fontSize="inherit" style={{ color: "#ffffff"}}/>}
                </IconButton>
                <IconButton onClick={toggleMute} className={classes.bottomIcons} aria-label="volume">
                    {muted ? <VolumeOffIcon style={{ color: "#ffffff"}}/> : <VolumeUpIcon style={{ color: "#ffffff"}}/>}
                </IconButton>
                <Slider onChange={changeVolume}
                    size="small"
                    min={0}
                    max={100}
                    value={volume * 100}
                    style={{ width: "100px", color: "#ffffff" }}
                ></Slider>
                <Button onClick={onChangeDisplayFormat} variant="text" style={{ color: "#ffffff", marginLeft: 16 }}>
                    <Typography>{elapsedTime} / {totalDuration}</Typography>
                </Button>
                </div>
                <div className="right-container">
                {!fullScreen ? 
                    <>
                    <IconButton
                        onClick={handlePopover1}
                        variant="text"
                        className={classes.bottomIcons}
                    >
                        <Typography style={{color: "#ffffff"}}>{playbackRate}X</Typography>
                    </IconButton>
                    <Popover
                      id={id1}
                      open={open1}
                      anchorEl={anchorEl1}
                      onClose={handleClose1}
                      anchorOrigin={{
                      vertical: "top",
                      horizontal: "center",
                      }}
                      transformOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                      }}
                    >
                    <Grid container direction="column-reverse">
                      {[0.5, 1, 1.5, 2].map((rate, index) => (
                        <IconButton key={index} onClick={() => {changePlaybackRate(rate);handleClose1();}} variant="text">
                          <Typography style={{color: "#fcba03"}}>{rate}X</Typography>
                        </IconButton>
                      ))}
                    </Grid>
                </Popover> </>: <div></div>                 
              }
                <IconButton onClick = {toggleActivePip} className={classes.bottomIcons} aria-label="pip">
                    <PictureInPictureAltIcon style={{color: "#ffffff"}}/>
                </IconButton>
                {!fullScreen ? 
                  <>
                  <IconButton
                    onClick={handlePopover2}
                    variant="text"
                    className={classes.bottomIcons}
                  >
                    <HighQualityIcon style={{color: "#ffffff"}}/>
                  </IconButton>
                  <Popover
                      id={id2}
                      open={open2}
                      anchorEl={anchorEl2}
                      onClose={handleClose2}
                      anchorOrigin={{
                      vertical: "top",
                      horizontal: "center",
                      }}
                      transformOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                      }}
                  >
                      <Grid container direction="column-reverse">
                      {quality_array.map((quality, index) => (
                          <IconButton key={index} onClick={() => {changeQuality(index); handleClose2();}} variant="text">
                            <Typography style={{color:"#fcba03"}}>{quality}p</Typography>
                          </IconButton>
                      ))}
                      </Grid>
                  </Popover>
                </> : <div></div>  
                }
                <IconButton onClick={toggleFullScreen}className={classes.bottomIcons} aria-label="fullscreen">
                    {fullScreen ? <FullscreenExitIcon style={{color: "#ffffff"}}/> : <FullscreenIcon style={{color: "#ffffff"}}/>}
                </IconButton>
                </div>
            </div>
            </div>
        </div>
    );
});