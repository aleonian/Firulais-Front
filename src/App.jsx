// import * as React from 'react';
import { Fragment } from 'react';
import { Home } from './pages/Home';
import { Logout } from './pages/Logout';
import { Login } from './pages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </Fragment >
  )
}

export default App
