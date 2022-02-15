/**
 * To handle a single reservation,
 * To be used on reservation list page
 */
import React from "react";
import { toast } from "react-toastify";
import { Box, Card, CardActions, CardContent, Button, Typography } from "@mui/material";

import useAuth from "../hooks/useAuth";
import { Api } from "../service/api";

export default function Reservation({ reservationData, reload }) {

    const [user] = useAuth();

    const handleClick = () => {
        Api.deleteReservation(reservationData.id, user)
            .then(() => {
                toast.success("Reservation has been cancelled!");
                reload();
            })
            .catch(err => toast.error(err?.response?.data?.message || "Something went wrong"));
    }

    if (!reservationData) return <></>;
    return <>
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <Typography variant="h4" component="div">
                            {reservationData.bike.model}
                        </Typography>
                        <Typography variant="h6">
                            {reservationData.fromDateTime} to {reservationData.toDateTime}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="large" onClick={handleClick}>Cancel Reservation</Button>
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    </>;
}