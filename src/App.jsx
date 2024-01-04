import './App.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import Navbar from './components/Navbar/Navbar'

function App() {

  return (
    <>
      <div>
        <Navbar />
        <h1>Welcome to Firulais</h1>
        <Button variant="contained">Hello world</Button>
      </div>
    </>
  )
}

export default App
