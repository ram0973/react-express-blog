import axios from '../axios';
import React from "react";

export const Home = () => {
  React.useEffect(
    () => axios.get('/posts')
  );
  return (
    <>
      Home
    </>
  )
}