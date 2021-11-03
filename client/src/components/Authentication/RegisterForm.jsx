import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Avatar, Paper, TextField, Button, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

Register.propTypes = {};

function Register(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {handleRegister, notification} = props;

    const changeUsername = (event) => {
        setUsername(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) =>{
        const dataRegister = {username, password};
        event.preventDefault();
        if(handleRegister) {
            handleRegister(dataRegister);
        }
    }

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto", borderRadius:"15px"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnStyle={margin:'8px 0'}
    const textFileStyle={margin: '5px 0 5px 0'}
    const flexStyle = {display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign Up</h2>
                    {(notification.status === true) ?
                        <Typography variant="subtitle1" display="block" color="success">{notification.message}</Typography>
                        :
                        <Typography variant="subtitle1" display="block" color="error">{notification.message}</Typography>
                    }
                </Grid>
                <TextField label='Username' style={textFileStyle} name="username" placeholder='Enter username' fullWidth required onChange={changeUsername}/>
                <TextField label='Password' style={textFileStyle} name="password" placeholder='Enter password' type='password' fullWidth required onChange={changePassword}/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' onClick={handleSubmit} color='primary' variant="contained" style={btnStyle} fullWidth>Sign In</Button>
                <Grid container style={flexStyle}>
                    <Grid item><Typography>Have an account ?</Typography></Grid>
                    <Grid item><Link to="/loginForm">Login Now</Link></Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default Register;