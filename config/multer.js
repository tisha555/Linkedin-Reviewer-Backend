import multer from "multer";
import fs from "fs";
import path from "path";

// ✅ Correct folder
const uploadDir = path.join(process.cwd(), "uploads", "resumes");

// ✅ Auto create folder
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

export default upload;


