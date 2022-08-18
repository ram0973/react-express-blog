import React from 'react';
import {Avatar, Paper, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import styles from "./Registration.module.scss";

function Registration() {
  return (
    <>
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Создание аккаунта
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField className={styles.field} label="Имя" fullWidth />
        <TextField className={styles.field} label="E-Mail" fullWidth />
        <TextField className={styles.field} label="Пароль" fullWidth />
        <Button size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </Paper>
    </>
  );
}

export default Registration;