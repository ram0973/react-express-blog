import express from 'express';
import {loginValidation, postCreateValidation, registerValidation} from "./validations/validations.js";
import mongoose from "mongoose";
import checkAuth from "./middleware/checkAuth.js";
import handleValidationErrors from "./middleware/handleValidationErrors.js";
import { UserController, PostController } from './controllers/index.js';
import multer from "multer";
import fs from "fs";
import cors from "cors";

export const JWT_SUPER_SECRET = 'JWT_SUPER_SECRET';
const MONGO_URI = "mongodb://mongo:mongo@localhost:27017/express?authSource=admin";
const NODE_EXPRESS_PORT = 4444;

mongoose
  .connect(process.env.MONGODB_URI || MONGO_URI)
  .then(() => console.log("DB connect OK"))
  .catch((err) => console.log("DB err", err));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.get('/', async (req, res) => {  res.json("Main page"); });

app.post('/api/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/api/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.get('/api/auth/me',  checkAuth,  UserController.getMe)

app.post('/api/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/api/articles', PostController.getAll);
app.get('/api/articles/tags', PostController.getLastTags);
app.get('/api/articles/:id', PostController.getOne);
app.post('/api/articles', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/api/articles/:id', checkAuth, PostController.remove);
app.patch('/api/articles/:id',  checkAuth,  postCreateValidation, handleValidationErrors, PostController.update);
app.get('/api/articles/tags', PostController.getLastTags);

app.listen(process.env.PORT || NODE_EXPRESS_PORT, (err) => {
  if (err) {
    console.log(err);
    return err;
  }
  console.log('Express JS server started ...');
});
