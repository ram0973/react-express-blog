import React from 'react';
import { Home } from "./pages/Home";
import {Header} from "./components/Header";
import {Container} from "@mui/material";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Home />
        {/*<FullPost />*/}
        {/*<AddPost />*/}
        {/*<Login />*/}
        {/*<Registration />*/}
      </Container>
    </>
  );
}
export default App;
