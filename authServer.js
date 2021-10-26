import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "./model/User.js";
import writeLog from './my_modules/writeLog.js';
import osu from 'node-os-utils';
var cpu = osu.cpu;

main().catch((err) => writeLog("authServer","database","error","Connect Database",err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://admin:Huyhuyhuy1998@cluster0.edeoy.mongodb.net/test"
  );
}

export default async function getCpuAuthServer(){
  return await cpu.usage().then(data => data);
}

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.post("/login", (req, res) => {
  try{
    writeLog("authServer","guest","notification","REQUEST","LOGIN");
    const dataLogin = req.body; // Thông tin mà người dùng submit lên
    User.findOne(
      { username: dataLogin.username, password: dataLogin.password },
      function (err, data) {
        if (err || !data) {
          writeLog("authServer","guest","error","Login",`Đăng nhập thất bại - ${JSON.stringify(dataLogin)}`);
          res.json({status:0, message:"Đăng nhập thất bại!"});
        }
        else {
          const access_token = jwt.sign(
            { username: data.username},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "24h" }
          );

          data.save().then(() => {
            writeLog("authServer",dataLogin.username,"success","Login","Đăng nhập thành công!");
            res.json({
              status: 1,
              username: dataLogin.username,
              access_token,
              account_type: data.account_type,
              message:"Đăng nhập thành công!"
            });
          });
        }
      }
    );
  } catch (err) {
    writeLog("authServer","server","error","Unknown",err);
  }
});

app.listen(process.env.PORT_AUTH_SERVER || 3001, () =>{
  writeLog("dataServer","server","success","Start Server","AuthServer listening on: " + process.env.PORT_AUTH_SERVER || 3001);
});