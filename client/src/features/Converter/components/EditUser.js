import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import userApi from 'API/userApi';
import { useEffect } from 'react';

const EditUser = ({handleEdit, setMessage}) => {
    const {id} = useParams();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [account_type, setAccountType] = useState("normal");

    useEffect(() => {
        userApi.getUser(id)
        .then(response => {
            if(response.status === 1)   {
                setUsername(response.user.username);
                setPassword(response.user.password);
                setAccountType(response.user.account_type);
            }
        })
        .catch(err => console.log(err));
    }, [id]);

    const changeUsername = (event) => {
        setUsername(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    const changeAccountType = (event) => {
        setAccountType(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(username !== "" && password !== "") handleEdit({id, username, password, account_type})
        else setMessage("Tên đăng nhập và mật khẩu không hợp lệ!");
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <label>Username:<input type="text" value={username} onChange={changeUsername}/></label>
            <label>Password:<input type="text" value={password} onChange={changePassword}/></label>
            <label >Account Type: 
                <select value={account_type} name="account_type" id="account_type" onChange={changeAccountType}>
                    <option value="modifier">Modifier</option>
                    <option value="normal">Normal</option>
                </select>
            </label>
            <button type="submit">Lưu tài khoản</button>
        </form>
    </>
  );
}

export default EditUser;