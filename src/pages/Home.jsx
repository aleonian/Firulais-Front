import { React, Fragment } from 'react';
import Button from '@mui/material/Button';
import Navbar from '../components/Navbar/Navbar'

export const Home = () => {
    return (
        <Fragment>
            <div>
                <Navbar />
                <h1>Welcome to Firulais</h1>
                <Button variant="contained">Hello world</Button>
            </div>
        </Fragment>
    )
};



