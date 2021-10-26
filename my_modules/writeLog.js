import { appendFileSync, existsSync, writeFileSync} from "fs";
import mkdirp from "mkdirp";

export default function writeLog(server, userLogin, type, action, message) {
  // Cấu trúc log: [13/06/2019-06:59][daudaudinang] : Gửi yêu cầu đăng nhập với username: admin và password: admin1234
  // Cấu trúc log: [13/06/2019-06:59][daudaudinang] : Đăng nhập thất bại
  // Cấu trúc log: [13/06/2019-06:59][daudaudinang] : Gửi yêu cầu đăng ký với username: admin và password: admin1234
  // Cấu trúc log: [13/06/2019-06:59][daudaudinang] : Đăng xuất

  // getDate and Time
  const getCurrentTime = new Date();
  const time = getCurrentTime.toLocaleString("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
  });

  // get Type: error, warning or message
  let log = `[${time}][${userLogin}][${type}] ${action}: ${message}`;

  if(type === "notification") log = "\n######" + log;
  
  try {
  // Kiểm tra folder và file xem đã tồn tại chưa, nếu chưa tồn tại thì thêm
    if (!existsSync(`./log/${server}`)) mkdirp.sync(`./log/${server}/${userLogin}`);
    if (!existsSync(`./log/${server}/all.txt`)) writeFileSync(`./log/${server}/all.txt`,"### START LOGGING ###");
    if(!existsSync(`./log/${server}/${userLogin}/${userLogin}-log.txt`)) {
      mkdirp.sync(`./log/${server}/${userLogin}`);
      writeFileSync(`./log/${server}/${userLogin}/${userLogin}-log.txt`,"### START LOGGING ###");
    }

  // Lưu tập trung log vào log/authServer/all.txt
  // Lưu log truy cập của từng người vào log/authServer/<username>
    appendFileSync(`./log/${server}/all.txt`, '\n'+log);
    console.log(log);
    appendFileSync(`./log/${server}/${userLogin}/${userLogin}-log.txt`, '\n'+log);
  } catch (err) {
    console.log(err);
  }
};
