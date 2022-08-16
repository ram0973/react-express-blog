import jwt from 'jsonwebtoken';
import {jwtSuperSecret} from "../index.js";

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      const decoded = jwt.verify(token, jwtSuperSecret, {}, null);

      req.userId = decoded._id;
      next();
    } catch (e) {
      console.log("Token decode error", e);
      return res.status(403).json({
        message: 'Нет доступа',
      });
    }
  } else {
    console.log("Token is empty")
    return res.status(403).json({
      message: 'Нет доступа',
    });
  }
};