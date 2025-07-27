import mongoose, {Schema} from "mongoose";

const noteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const noteModel = mongoose.model("Note", noteSchema);
export default noteModel;
