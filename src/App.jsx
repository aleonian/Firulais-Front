import * as React from 'react';
import { Fragment } from 'react';
import { Home } from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
