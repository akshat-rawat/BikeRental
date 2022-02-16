/**
 * To handle a single reservation,
 * To be used on reservation list page
 */
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Box, Card, CardActions, CardContent, Button, Typography, Rating } from "@mui/material";
import styled from "styled-components";
import CircleIcon from '@mui/icons-material/Circle';

import useAuth from "../hooks/useAuth";
import { Api } from "../service/api";

export default function Reservation({ reservationData, reload }) {
    const [rating, setRating] = useState(reservationData.userRating || 0);
    const [ratingMode, setRatingmode] = useState(false);

    const isActive = reservationData?.status === 'active';
    const [user] = useAuth();

    const addRating = () => {
        Api.addRating({ id: reservationData.id, rating }, user)
            .then(() => {
                toast.success("Rating added!");
                setRatingmode()
                reload();
            })
            .catch(err => toast.error(err?.response?.data?.message) || "Something went wrong");
    }

    const handleClick = () => {
        Api.cancelReservation(reservationData.id, user)
            .then(() => {
                toast.success("Reservation has been cancelled!");
                reload();
            })
            .catch(err => toast.error(err?.response?.data?.message || "Something went wrong"));
    }

    if (!reservationData) return <></>;
    return <>
        <StyledComponents>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">
                    <React.Fragment>
                        <CardContent sx={{ paddingBottom: "0" }}>
                            <div className="column">
                                <Typography variant="h4" component="div">
                                    {reservationData.bike.model}
                                </Typography>
                                <CircleIcon color={isActive ? 'success' : 'error'} />
                            </div>
                            <div className="column">
                                <Rating className="rating" name="read-only" value={rating} onChange={(_, newValue) => ratingMode && setRating(newValue)} readOnly={!ratingMode} />
                                <Typography variant="h6">
                                    {reservationData.fromDateTime.slice(0, 10)} to {reservationData.toDateTime.slice(0, 10)}
                                </Typography>
                            </div>
                        </CardContent>
                        <CardActions>
                            <div className="column">
                                <div>
                                {!reservationData.userRating && isActive && (ratingMode ? <Button onClick={addRating}>Done</Button> : <Button onClick={() => setRatingmode(true)}>Rate Now</Button>)}
                                </div>
                                {isActive && <Button onClick={handleClick}>Cancel Reservation</Button>}
                            </div>
                        </CardActions>
                    </React.Fragment>
                </Card>
            </Box>
        </StyledComponents>
    </>;
}


const StyledComponents = styled.div`

    margin:15px 0 ;
    box-ashadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    .heading { 
        text-align: center;
    }

    .column {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .rating { 
        margin: 8px 0 0 0;
    }
`