import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";
import fs from "fs";


const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${nanoid()}${ext}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });
