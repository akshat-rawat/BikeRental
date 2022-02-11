import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { AppBar, Button, Box, Typography, Toolbar } from '@mui/material';

export default function ButtonAppBar() {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button variant="h1" color="inherit" onClick={() => navigate("/")}>Bikes</Button>
                        <Button variant="h1" color="inherit" onClick={() => navigate("/reservations")}>Reservations</Button>
                        <Button variant="h1" color="inherit" onClick={() => navigate("/users")}>Users</Button>
                    </Typography>
                    <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}