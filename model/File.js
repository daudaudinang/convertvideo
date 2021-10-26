import mongoose from "mongoose";
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var File = new Schema(
  {
    username: String,
    filename: String,
    formatInput: String,
    formatOutput: String,
    videoCodecOutput: String,
  },
  { collection: "file", usePushEach: true }
);

export default mongoose.model("File", File);
