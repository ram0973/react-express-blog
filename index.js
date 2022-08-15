import express from 'express';
import jwt from 'jsonwebtoken';
import pkg from 'pg';
import {registerValidation} from "./validations/auth.js";
import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

// const {Pool} = pkg;
//
// const pgPool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'express',
//   password: 'postgres',
//   port: 5432,
// })

mongoose.connect("mongodb://localhost:27017/express");

class UserModel {
  constructor({fullName, email, passwordHash, avatarUrl}) {
    this.fullName = fullName,
      this.email = email,
      this.passwordHash = passwordHash,
      this.avatarUrl = avatarUrl
  }
}

/*
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fullName VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  passwordHash VARCHAR NOT NULL,
  avatarUrl VARCHAR,
  CONSTRAINT email_unique UNIQUE (email)
);
*/

/*
INSERT INTO users(fullname, email, passwordhash, avatarurl)
       VALUES ('Jerry', 'jerry@example.com', '123', 'avatar.jpg');
 */

async function getUsers() {
  return await pgPool.query('SELECT * FROM users ORDER BY id ASC')
    .then(res => res.rows)
    .catch(e => console.error(e));
}

async function saveNewUser(fullName, email, passwordHash, avatarUrl) {
  return await pgPool.query(
    'INSERT INTO users (fullName, email, passwordHash, avatarUrl) VALUES ($1, $2, $3, $4) RETURNING *',
    [fullName, email, passwordHash, avatarUrl])
    .then(res => res.rows)
    .catch(e => console.error(e)
  );
}

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  let users = await getUsers();
  console.log(users);
  res.json(users);
});

app.post(
  '/auth/register',
  registerValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let user = await saveNewUser(req.body.fullName, req.body.email, passwordHash, req.body.avatarUrl);
    // const doc = new UserModel({
    //   fullName: req.body.fullName,
    //   email: req.body.email,
    //   passwordHash: passwordHash,
    //   avatarUrl: req.body.avatarUrl
    // });

    res.json({success: true});
  }
);

app.post('/auth/login', (req, res) => {
  const token = jwt.sign({
      email: req.body.email,
      fullName: 'John Travolta',
    },
    'super_secret_key');
  res.json({
    success: true,
    token,
  });
});

app.listen(4444, (err) => {
  if (err) {
    console.log(err);
    return err;
  }
  console.log('Seems server is running now ...');
});