import express from 'express';
import {postCreateValidation, registerValidation} from "./validations/validations.js";
import mongoose from "mongoose";
import checkAuth from "./middleware/checkAuth.js";
import { UserController, PostController } from './controllers/index.js';

export const jwtSuperSecret = 'JWT_SUPER_SECRET';

mongoose
  .connect("mongodb://mongo:mongo@localhost:27017/express?authSource=admin")
  .then(() => console.log("DB connect OK"))
  .catch((err) => console.log("DB err", err));

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {  res.json("Main page"); });

app.post('/auth/register', registerValidation,  UserController.register);
app.post('/auth/login', UserController.login)
app.get('/auth/me',  checkAuth,  UserController.getMe)

//app.get('/tags', PostController.getLastTags);

app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id',  checkAuth,  postCreateValidation, PostController.update);

app.listen(4444, (err) => {
  if (err) {
    console.log(err);
    return err;
  }
  console.log('Express JS server started ...');
});