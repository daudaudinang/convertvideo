import mongoose from 'mongoose';
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var User = new Schema({
  account_type:  String,
  username: String,
  password: String,
},{collection : 'user', usePushEach: true });

export default mongoose.model('User', User);