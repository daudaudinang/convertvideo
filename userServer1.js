import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import File from "./model/File.js";
import User from "./model/User.js";
import mongoose from "mongoose";
import authenToken from "./middleware/authenToken.js";
import fs from "fs";
import writeLog from './my_modules/writeLog.js';
import osu from 'node-os-utils';
var cpu = osu.cpu;

dotenv.config();

main().catch((err) => writeLog("userServer1","database","error","Connect Database",err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://admin:Huyhuyhuy1998@cluster0.edeoy.mongodb.net/test"
  );
}

export default async function getCpuuserServer1(){
  return await cpu.usage().then(data => data);
}

const app = express();

app.use(express.json());
app.use(cors());

app.get("/testUser", function (req, res, next) {
  console.log("user Server 1");
  res.send("user Server 1");
});

// Người dùng đăng ký
app.post("/register", function (req, res, next) {
  try{
    writeLog("userServer1","guest","notification","REQUEST","REGISTER");
    User.find({ username: req.body.username }, function (err, data) {
      if(err) writeLog("userServer1","guest","error","Register",err);
      else if (data.length > 0) {
        writeLog("userServer1","guest","error","Register","Tài khoản đã tồn tại!");
        res.json({ status: 0, message: "Tài khoản đã tồn tại!" });
      } else {
        let user = new User({
          username: req.body.username,
          password: req.body.password,
          account_type: "normal",
          listFile: [],
        });
        user.save().then(() => {
          writeLog("userServer1","guest","success","Register","Tạo tài khoản thành công!" + req.body.username);
          res.json({ status: 1, message: "Tạo tài khoản thành công!" });
        });
      }
    });
    } catch (err) {
      writeLog("userServer1","server","error","Unknown",err);
    }
});

function authenModifier(req, res, next) {
  User.find({username: req.username, account_type: "modifier"}, function(err, data){
    if(err || !data) {
      writeLog("userServer1",req.username,"error","Authenticate Modifier","Lỗi database hoặc người dùng đang cố tình yêu cầu chỉnh sửa thông tin người khác!");
      res.json({status:0, message:"Chỉ tài khoản Admin mới được quyền chỉnh sửa data User!"});
    } else next();
  });
};

app.post('/getUser', authenToken, authenModifier, (req, res) => {
  try{
    writeLog("userServer1",req.username,"notification","REQUEST","GET A USER");
    User.findById(req.body.id, function(err, user){
      if(err || !user) {
        writeLog("userServer1",req.username,"error","Get A User","Không tìm thấy người dùng!");
        res.json({status: 0, message: "Không tìm thấy người dùng!"});
      } else {
        res.json({status: 1, user: user, message: "Lấy thông tin người dùng thành công!"});
      }
    })
  } catch (err) {
    writeLog("userServer1","server","error","Unknown",err);
  }
});

app.post('/getUserList', authenToken, authenModifier, (req, res) => {
  console.log("Userserver1 served!");
  try{
    writeLog("userServer1",req.username,"notification","REQUEST","GET LIST USER");
    User.find()
      .then(userList => {
        writeLog("userServer1",req.username,"success","Get UserList","Lấy danh sách người dùng thành công!");
        res.json({status: 1, userList, message: "Lấy danh sách người dùng thành công!"});
      })
      .catch(err => {
        res.json({status: 0, message: err})
      });
  } catch (err) {
    writeLog("userServer1","server","error","Unknown",err);
  }
});

// Admin thêm User
app.post('/addUser', authenToken, authenModifier, function (req, res, next) {
  try{
    writeLog("userServer1",req.username,"notification","REQUEST","ADD A USER");
    User.find({username: req.body.username}, function(err, data){
      if(err) {
        writeLog("userServer1",req.username,"error","Looking For Username Input","Lỗi database!");
        res.json({status: 0, message:"Lỗi database!"})
      } else if(data.length > 0){
        writeLog("userServer1",req.username,"error","Looking For Username Input","Tài khoản đã tồn tại!");
        res.json({status:0, message:"Tài khoản đã tồn tại!"});
      } else {
        let user = new User({
          username: req.body.username,
          password: req.body.password,
          account_type: req.body.account_type,
          listFile: []
        });
        user.save().then(function () {
          writeLog("userServer1",req.username,"success","Add User","Tạo tài khoản thành công!" + req.body.username);
          res.json({ status: 1, message: "Tạo tài khoản thành công!" });
        });
      }
    });
  } catch (err) {
    writeLog("userServer1","server","error","Unknown",err);
  }
});

// Sua user
app.post('/editUser', authenToken, authenModifier, function (req, res, next) {
  try {
    writeLog("userServer1",req.username,"notification","REQUEST","EDIT A USER");
    User.findById(req.body.id, function (err, user) {
      if (err) {
        writeLog("userServer1",req.username,"error","Looking For Username Input","Lỗi database!");
        res.json({status:0, message:"Lỗi database!"});
      } else if(!user){
        writeLog("userServer1",req.username,"error","Looking For Username Input",`Không tìm thấy người dùng!`);
        res.json({status:0, message:"Không tìm thấy người dùng!"});
      } else{
        const userBeEdited = user.username;
        user.account_type = req.body.account_type;
        user.username = req.body.username;
        user.password = req.body.password;
        user.save().then(function () {
          writeLog("userServer1",req.username,"success","Edit User",`Sửa thông tin người dùng ${userBeEdited} thành công!`);
          res.json({ status: 1, message: `Sửa thông tin người dùng ${userBeEdited} thành công!` });
        });
      }
    });
  } catch (err) {
    writeLog("userServer1","server","error","Unknown",err);
  }
});

// Xoá user
app.post('/removeUser', authenToken, authenModifier, function (req, res, next) {
  try{
    writeLog("userServer1",req.username,"notification","REQUEST","REMOVE A USER");
    User.findById(req.body.id, function (err, user) {
      if(err) {
        writeLog("userServer1",req.username,"error","Remove A User","Lỗi database!");
        res.json({status:0, message:"Lỗi database!"});
      } else if(!user) {
        writeLog("userServer1",req.username,"error","Remove A User","Không tìm thấy người dùng!"); 
        res.json({status:0, message:"Không tìm thấy người dùng!"});
      } else {
        const userBeDeleted = user.username;
        //Xoá directory mà user này upload
        fs.rmdirSync('./upload/'+ user.username, { recursive: true });
        
        // Xoá listFile mà User này đã upload khỏi Database
        File.deleteMany({username : user.username}, function(err, data){
          writeLog("userServer1",req.username,"success","Remove ListFile",`Xoá list File người dùng ${userBeDeleted} đã upload thành công!`); 
        })

        // Xoá user khỏi database
        user.remove(function () { 
          writeLog("userServer1",req.username,"success","Remove ListFile",`Xoá người dùng ${userBeDeleted} khỏi database thành công!`); 
          res.json({ status: 1, message: `Xoá người dùng ${userBeDeleted} thành công!` });
        });
      }
    });
  } catch (err) {
    writeLog("userServer1","server","error","Unknown",err);
  }
});

app.listen(process.env.PORT_USER_SERVER1 || 3003, () =>
  {
    writeLog("userServer1","server","success","Start Server","User Server 1 listening on: " + process.env.PORT_USER_SERVER1 || 3003);
  }
);