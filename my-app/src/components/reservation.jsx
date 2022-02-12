/**
 * To handle a single reservation,
 * To be used on reservation list page
 */
import React from "react";
import { toast } from "react-toastify";
import { Box, Card, CardActions, CardContent, Button, Typography } from "@mui/material";

export default function Reservation({ reservationData, reload }) {

    const handleClick = () => {
        toast.success("Reservation has been cancelled!");
        reload();
    }

    if (!reservationData) return <></>;
    return <>
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <Typography variant="h4" component="div">
                            {reservationData.bikeModel}
                        </Typography>
                        <Typography variant="h6">
                            {reservationData.fromDate} - {reservationData.toDate}
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