import React from 'react';
import {Avatar, Paper, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import styles from "./Registration.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin, fetchRegister, selectIsAuth} from "../../redux/slices/auth";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router-dom";

function Registration() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register, handleSubmit, setError, formState: {errors, isValid}
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: "onChange"
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      alert('Не удалось зарегистрироваться');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  }

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Paper classes={{root: styles.root}}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Создание аккаунта
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.field}
            label="Имя"
            error={Boolean(errors.fullName?.message)}
            helperText={errors.fullName?.message}
            {...register('fullName', {required: 'Укажите полное имя'})}
            fullWidth />
          <TextField
            className={styles.field}
            label="E-Mail"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', {required: 'Введите почту'})}
            fullWidth />
          <TextField
            className={styles.field}
            label="Пароль"
            error={Boolean(errors. password?.message)}
            helperText={errors.password?.message}
            {...register('password', {required: 'Введите пароль'})}
            fullWidth />
          <Button type="submit" size="large" variant="contained" fullWidth>
            Зарегистрироваться
          </Button>
        </form>
      </Paper>
    </>
  );
}

export default Registration;