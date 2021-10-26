import jwt from 'jsonwebtoken';

export default function authenToken(req, res, next) {
    // Lấy ra header người dùng gửi lên
    const authorizationHeader = req.headers['authorization'];

    // authorization người dùng gửi lên sẽ có dạng là 1 string: 'Beaer [token]'
    if(!authorizationHeader) res.json({status:-1, message:"Không nhận được Access Token!"});
    else {
        const token = authorizationHeader.split(' ')[1];
        if(!token) res.json({status:0, message:"Sai Access Token!"});
        else {
            // Xác thực với jwt 
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
                if(err) res.json({status:-1, message:"Sai Access Token!"});
                else {
                    req.username = data.username;
                    next();
                }
            });
        }
    }
}