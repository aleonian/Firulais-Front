// eslint-disable-next-line no-unused-vars
import { React, Fragment } from 'react';
import { TemporaryDrawer } from '../components/Navbar/Navbar';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const About = () => {

    return (

        <Fragment>
            <Box>
                <TemporaryDrawer />
            </Box>

            <Box sx={{
                marginTop: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>

                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '50%',
                    }}>
                    <Typography component="h1" variant="h3">
                        Firulais 🐶
                    </Typography>
                    <Typography component="h3" variant="h5">
                        An app created by <a href="aleonian@telesign.com">Alejandro Leonian</a> for Telesign
                    </Typography>

                    <Fragment>
                        {/* <Card>
                            <CardContent> */}
                        <Typography 
                        variant="p" 
                        color="text.secondary" 
                        gutterBottom
                        mt={5}
                        >
                            Frontend:
                            <ul>
                                <li className='about-li'><img className="about-img" src="/images/react.png" />   React.js</li>
                                <li className='about-li'><img className="about-img" src="/images/mui.png" />   Material UI</li>
                            </ul>
                            Backend:
                            <ul>
                                <li className='about-li'><img className="about-img" src="/images/nodejs.png" />   Node.js</li>
                                <li className='about-li'><img className="about-img" src="/images/mongodb.png" />   MongoDB</li>
                            </ul>
                        </Typography>

                        {/* </CardContent>
                        </Card> */}

                    </Fragment>
                </Box>
            </Box>
        </Fragment >
    )
};



