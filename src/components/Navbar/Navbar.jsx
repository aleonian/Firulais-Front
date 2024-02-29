import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

export function TemporaryDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (

        < Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }
            }
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem key={"Home"} disablePadding>
                    <a href="/" className='drawerLink'>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeRoundedIcon color="primary" fontSize="large" />
                            </ListItemIcon>
                            <ListItemText primary={"Home"} />
                        </ListItemButton>
                    </a>
                </ListItem>
                <a href="/about" className='drawerLink'>
                    <ListItem key={"About"} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InfoRoundedIcon color="primary" fontSize="large" />
                            </ListItemIcon>
                            <ListItemText primary={"About"} />
                        </ListItemButton>
                    </ListItem>
                </a>
                <a href="/logout" className='drawerLink'>
                    <ListItem key={"Contact"} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LogoutIcon color="primary" fontSize="large" />
                            </ListItemIcon>
                            <ListItemText primary={"Logout"} />
                        </ListItemButton>
                    </ListItem>
                </a>
            </List>
            <Divider />
        </Box >
    );

    return (
        <div>
            {[{ name: 'menu', from: 'left' }].map((anchor) => (
                <React.Fragment key={anchor.name}>
                    <Button onClick={toggleDrawer(anchor.from, true)}><MenuIcon fontSize="large" /></Button>
                    <Drawer
                        anchor={anchor.from}
                        open={state[anchor.from]}
                        onClose={toggleDrawer(anchor.from, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
