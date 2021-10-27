import FileApi from 'API/fileApi';
import Banner from 'components/Banner';
import Images from 'constants/images';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'reactstrap';
import { removeFile, saveFile } from './../../../actions/file';
import { FileTable } from '../components/FileTable1';
import VideoDisplay from '../components/VideoDisplay';
import "./style.css";
import {Grid, Typography, Input, Button} from "@mui/material";

function ConvertFile(props) {
    const listFile = useSelector(state => state.file.listFile);
    const dispatch = useDispatch();

    const [video, setVideo] = useState({data: null, status: 0}); // status: 0: Chưa có file upload, 1: Đã có file upload, chưa convert, 2: Đã convert hoàn thành
    const [videoView, setVideoView] = useState("https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd");
    const [message, setMessage] = useState(null);
    const [changeData, setChangeData] = useState(0);
    const [outputOption, setOutputOption] = useState({videoCodec: "h264", videoFormat: "hls"});

    const flexStyle = {display: 'flex', flexDirection: 'row', alignItems: 'flex-start', padding:'10px'}
    const flexStyle2 = {display: 'flex', flexDirection: 'row', alignItems: 'center'}
    const flexStyle2Item = {marginRight: "20px"}

    const styleHeader = {marginBottom: '30px'}

    useEffect(() => {
        FileApi.getListFile()
        .then(response => {
            if(response.status === 1) {
                const actionSaveFile = saveFile(response.listFile);
                dispatch(actionSaveFile);
            }
            else console.log(response.message);
        })
        .catch(err => console.log(err));
   }, [changeData, dispatch]);


   const handleSubmit = (event) => {
    event.preventDefault();
    if(video.status === 0) setMessage("Bạn phải chọn video muốn convert!");
    else {
        const formData = new FormData();
        formData.append("video", video.data);
        formData.append("videoCodec",outputOption.videoCodec);
        formData.append("videoFormat",outputOption.videoFormat);
        (() => {
            setMessage("Đang convert... Vui lòng chờ!");
            FileApi.uploadFile(formData,outputOption)
            .then((response) => {
                setMessage(response.message);
                if(response.status === 1) {
                    setChangeData(changeData + 1);
                }
            })
            .catch(err => console.log(err));
        })();
    }
    
  }

  const handleChangeVideoInput = (event) => {
    if(event.target.files.length > 0) {
    const file = event.target.files[0];
    setVideo({data: file, status: 1});
    }
  }
  
  const handleChangeOptionVideoOutput = (event) => {
    setOutputOption({...outputOption, [event.target.name]:event.target.value});
  }

  const handleRemove = (event) => {
    event.preventDefault();
    // Đầu tiên, xoá nó khỏi array trong state
    const oldList = listFile;
    const newList = listFile.filter(item => item._id !== event.target.id);

    const actionRemoveFile = removeFile(newList);
    dispatch(actionRemoveFile);
    
    FileApi.removeFile(event.target.id)
    .then((response) => {
        if(response.status === 0) {
            const actionRemoveFile = removeFile(oldList);
            dispatch(actionRemoveFile);
        }
        setMessage(response.message);
    })
    .catch((err) => {
        console.log(err);
    }); 
  }

    return (
        <>
        <Banner title="Convert your video 🎉" backgroundUrl={Images.PINK_BG} message={message} />
        <Grid container style={flexStyle} spacing={2}>
            <Grid item xs={6}>
                <Grid container style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} spacing={1}>
                    <Grid item>
                        <Grid container style={flexStyle2} elevation={10}>
                            <Grid item style={flexStyle2Item}>
                                <Input type="file" color="primary" onChange={handleChangeVideoInput}></Input>
                            </Grid>
                            <Grid item style={flexStyle2Item}>
                                <Typography>Chọn định dạng</Typography>
                                <select onChange={handleChangeOptionVideoOutput} name="videoFormat" value={outputOption.videoFormat}>
                                    <option value="hls">HLS</option>
                                    <option value="dash">DASH</option>
                                </select>
                            </Grid>
                            <Grid item style={flexStyle2Item}>
                                <Typography>Chọn video codec</Typography>
                                <select onChange={handleChangeOptionVideoOutput} name="videoCodec" value={outputOption.videoCodec}>
                                    <option value="h264">H.264</option>
                                    <option value="h265">H.265</option>
                                    {(outputOption.videoFormat === "hls") ? <option value="vp9" disabled={true} >VP9</option> : <option value="vp9">VP9</option>}
                                </select>
                            </Grid>
                            
                            <Grid item style={flexStyle2Item}>
                                <Button type='submit' variant="contained" onClick={handleSubmit} color='primary'>Convert</Button>       
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <VideoDisplay video={videoView}/>
                    </Grid>
                </Grid>
                
            </Grid>
            <Grid item style={styleHeader} xs={6}><FileTable dataFile={listFile} handleRemove={handleRemove} setVideoView={setVideoView}/></Grid>
        </Grid>
        </>
    )
}

export default ConvertFile

