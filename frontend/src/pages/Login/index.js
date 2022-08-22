import React from 'react';
import {Button, Paper, TextField, Typography} from "@mui/material";
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin, selectIsAuth} from "../../redux/slices/auth";

import styles from "./Login.module.scss";
import {Navigate} from "react-router-dom";

function Login() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register, handleSubmit, setError, formState: {errors, isValid}
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: "onChange"
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchLogin(values));
    if (!data.payload) {
      alert('Не удалось авторизоваться');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', 'Bearer ' + data.payload.token);
    }
  }

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Paper classes={{root: styles.root}}>
        <Typography classes={{root: styles.title}} variant="h5">
          Вход в аккаунт
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.field}
            label="E-Mail"
            type="email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', {required: 'Укажите почту'})}
            fullWidth
          />
          <TextField
            className={styles.field}
            label="Пароль"
            type="password"
            error={Boolean(errors.password?.message)}
            helperText={errors.email?.message}
            {...register('password', {required: 'Введите пароль'})}
            fullWidth
          />
          <Button type="submit" size="large" variant="contained" fullWidth>Войти</Button>
        </form>
      </Paper>
    </>
  );
}

export default Login;