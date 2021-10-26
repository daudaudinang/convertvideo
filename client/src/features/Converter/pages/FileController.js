import FileApi from 'API/fileApi';
import Banner from 'components/Banner';
import Images from 'constants/images';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'reactstrap';
import { removeFile, saveFile } from './../../../actions/file';
import { FileTable } from '../components/FileTable2';

function FileController(props) {
    const listFile = useSelector(state => state.file.listFile);
    const dispatch = useDispatch();

    const [message, setMessage] = useState(null);

    useEffect(() => {
        FileApi.getListFile()
        .then((response) => {
            if(response.status === 1) {
                const actionSaveFile = saveFile(response.listFile);
                dispatch(actionSaveFile);
            }
            else console.log(response.message);
        })      
   }, [dispatch]);

  const handleRemove = (event) => {
    event.preventDefault();
    // Đầu tiên, xoá nó khỏi array trong state
    const newList = listFile.filter(item => item._id !== event.target.id);

    const actionRemoveFile = removeFile(newList);
    dispatch(actionRemoveFile);
    
    FileApi.removeFile(event.target.id)
    .then((response) => {
        setMessage(response.message);
    })
    .catch((err) => {
        console.log(err);
    });
  }

    return (
        <>
        <Banner title="Control Your File 🎉" backgroundUrl={Images.BLUE_BG} message={message}/>
        <div className="main-container-file">
            <FileTable dataFile={listFile} handleRemove={handleRemove}/>
        </div>
        </>
    )
}

export default FileController

