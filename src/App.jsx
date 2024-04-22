import * as React from 'react';
import { Fragment } from 'react';
import { Home } from './pages/Home';
import { Logout } from './pages/Logout';
import { Login } from './pages/Login';
import { About } from './pages/About';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </Fragment >
  )
}

export default App
