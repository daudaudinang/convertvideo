import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    TablePagination,
    TableFooter,
    Button,
    Link,
} from '@mui/material';

const BASEURL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles((theme) => ({
    table: {
      width:'100%'
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        width:'100%',
        overflow:'visible'
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
}));

export const FileTable = ({dataFile, handleRemove, handleChangeVideoView}) => {

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <TableContainer component={Paper} elevation={10} className={classes.tableContainer} color="secondary">
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell className={classes.tableHeaderCell}>File Upload</TableCell>
                <TableCell className={classes.tableHeaderCell}>File Converted</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {dataFile.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((oneFile) => (
                <TableRow key={oneFile._id}>
                    <TableCell>
                        <Grid container style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Grid item>
                                <Link href={BASEURL + "/" + oneFile._id + "/tai-file-upload"} target="_blank" rel="noopener noreferrer">{oneFile.filename}</Link>
                            </Grid>
                            <Grid item style={{display: "inline-flex", flexWrap: "nowrap", alignItems: "center", height:"20px"}}>
                                <Button variant="outlined" style={{height:"20px"}} color="error" onClick={() => handleChangeVideoView(BASEURL + "/upload/" + oneFile.username + "/" + oneFile.filename + "/" + oneFile.filename + "." + ((oneFile.formatInput === "hls") ? "m3u8" : ((oneFile.formatInput === "dash") ? "mpd" : oneFile.formatInput)))}>Xem thử</Button>
                                <Button variant="contained" color="success" style={{height:"20px"}}>{oneFile.formatInput}</Button>
                            </Grid>
                        </Grid>
                    </TableCell>
                    <TableCell>
                        <Grid container style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Grid item>
                                <Link href={BASEURL + "/" + oneFile._id + "/tai-file-convert"} target="_blank" rel="noopener noreferrer">{oneFile.filename}</Link>
                            </Grid>
                            <Grid item style={{display: "inline-flex", flexWrap: "nowrap", alignItems: "center", height:"20px"}}>
                                {/* {(oneFile.videoCodecOutput !== "h265") ? <Button variant="outlined" style={{height:"20px"}} color="error" onClick={() => handleChangeVideoView(BASEURL + "/upload/" + oneFile.username + "/" + oneFile.filename + "/Master." + ((oneFile.formatOutput === "hls") ? "m3u8" : ((oneFile.formatOutput === "dash") ? "mpd" : oneFile.formatOutput)))}>Xem thử</Button>
                                    : <Button variant="contained" style={{height:"20px"}} color="error">Không hỗ trợ</Button>
                                } */}
                                <Button variant="outlined" style={{height:"20px"}} color="error" onClick={() => handleChangeVideoView(BASEURL + "/upload/" + oneFile.username + "/" + oneFile.filename + "/Master." + ((oneFile.formatOutput === "hls") ? "m3u8" : ((oneFile.formatOutput === "dash") ? "mpd" : oneFile.formatOutput)))}>Xem thử</Button>
                                <Button variant="contained" color="success" style={{height:"20px"}}>{oneFile.formatOutput}</Button>
                                <Button variant="contained" color="primary" style={{height:"20px"}}>{oneFile.videoCodecOutput}</Button>
                            </Grid>
                        </Grid>
                    </TableCell>
                    <TableCell>
                        <Grid container>
                            <Grid item><Button color='primary' onClick={handleRemove} id={oneFile._id}>Xoá</Button></Grid>
                        </Grid>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    count={dataFile.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </TableRow>
            </TableFooter>
        </Table>
        </TableContainer>
    )
}
