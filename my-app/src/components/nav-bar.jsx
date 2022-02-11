import * as React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { AppBar, Button, Box, Typography, Toolbar } from '@mui/material';

import useAuth from '../hooks/useAuth';

export default function ButtonAppBar() {
    const navigate = useNavigate();

    const [user, setUser] = useAuth();
    const [coookies, setCookie, removeCookie] = useCookies(["user"]);

    const onLogout = () => {
        removeCookie("user");
        setUser(null);
        navigate("/");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button variant="h1" color="inherit" onClick={() => navigate("/")}>Bikes</Button>
                        <Button variant="h1" color="inherit" onClick={() => navigate("/reservations")}>Reservations</Button>
                        {user.isManager && <Button variant="h1" color="inherit" onClick={() => navigate("/users")}>Users</Button>}
                    </Typography>
                    <Button color="inherit" onClick={onLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}