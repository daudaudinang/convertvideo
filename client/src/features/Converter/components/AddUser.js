import React from 'react';
import { useState } from 'react';

const AddUser = ({handleAdd, setMessage}) => {
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [account_type, setAccountType] = useState("normal");

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
        if(username !== "" && password !== "") handleAdd({username, password, account_type})
        else setMessage("Tên đăng nhập và mật khẩu không hợp lệ!");
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <label>Username:<input type="text" onChange={changeUsername}/></label>
            <label>Password:<input type="text" onChange={changePassword}/></label>
            <label>Account Type: 
                <select name="" id="" value="normal" onChange={changeAccountType}>
                    <option value="modifier">Modifier</option>
                    <option value="normal">Normal</option>
                </select></label>
            <button type="submit">Thêm tài khoản</button>
        </form>
    </>
  );
}

export default AddUser;