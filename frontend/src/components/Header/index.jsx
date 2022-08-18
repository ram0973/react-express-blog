import React from "react";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import {Container} from "@mui/material";
import {Link} from 'react-router-dom';

let isAuth = true;

export const Header = () => {
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Spring app</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
              <Link to="/login">
                <Button variant="outlined">Войти</Button>
              </Link>
              <Link to="/register">
                <Button variant="contained">Создать аккаунт</Button>
              </Link>
              </>
            ) : (
              <>
                <Link to="/add-post">
                  <Button variant="outlined">Написать статью</Button>
                </Link>
                <Link to="/logout">
                  <Button variant="contained">Выйти</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};