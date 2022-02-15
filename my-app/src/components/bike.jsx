/**
 * To render a single bike, handle edit and update of bike,
 * to be used on bike list page
 */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TextField, Rating, Box, Card, CardActions, CardContent, Button, Typography, Checkbox } from "@mui/material";

import useAuth from "../hooks/useAuth"
import { Api } from "../service/api";


export default function Bike({
    bikeData,
    isNew,
    reload,
    handleBooking,
    canBookNow
}) {
    const [isEditMode, setEditMode] = useState(isNew);
    const [ratingMode, setRatingmode] = useState(false);
    const [editData, setEditData] = useState({
        avgRating: 0,
        model: "",
        color: "",
        location: "",
        isAvailable: false
    });

    const [user] = useAuth();

    useEffect(() => {
        if (bikeData) setEditData({ ...bikeData });
    }, [bikeData]);

    const handleDelete = () => {
        Api.deleteBike(bikeData.id, user)
            .then(() => {
                toast.success("Bike Deleted Successfully");
                reload();
            })
            .catch(err => toast.error(err?.response?.data?.message || "Something went wrong"));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isNew) {
            Api.addBike(editData, user)
                .then(() => {
                    toast.success("Bike Added Successfully");
                    reload();
                })
                .catch(err => toast.error(err?.response?.data?.message || "Something went wrong"));
        } else {
            Api.updateBike(editData.id, editData, user)
                .then(() => {
                    toast.success("Bike Updated Successfully");
                    reload();
                })
                .catch(err => toast.error(err?.response?.data?.message || "Something went wrong"));
        }
    }

    const addRating = () => {
        Api.addRating(editData, user)
            .then(() => {
                toast.success("Rating added!");
                setRatingmode(false)
                reload();
            })
            .catch(err => toast.error(err?.response?.data?.message) || "Something went wrong");
    }

    return <>
        <Box sx={{ minWidth: 275 }} component="form" onSubmit={handleSubmit}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        {isEditMode ?
                            <>
                                <TextField margin="normal" required id="outlined-required" label="Model" value={editData.model} onChange={(e) => setEditData({ ...editData, model: e.target.value })} /> <br />
                                <TextField margin="normal" required id="outlined-required" label="Color" value={editData.color} onChange={(e) => setEditData({ ...editData, color: e.target.value })} /> <br />
                                <TextField margin="normal" required id="outlined-required" label="Location" value={editData.location} onChange={(e) => setEditData({ ...editData, location: e.target.value })} />
                                <Typography variant="h6">
                                    <Checkbox checked={editData.isAvailable} onChange={e => { setEditData({ ...editData, isAvailable: e.target.checked }) }} />
                                    Available
                                </Typography>
                            </> :
                            <>
                                <Typography variant="h4" component="div">
                                    {bikeData.model}
                                </Typography>
                                <Typography variant="h6">
                                    {bikeData.color}
                                </Typography>
                                <Typography variant="h6">
                                    {bikeData.location}
                                </Typography>
                                <Typography variant="h6">
                                    <Checkbox disabled checked={bikeData.isAvailable} />
                                    Available
                                </Typography>
                            </>
                        }
                        <Rating name="read-only" value={editData.avgRating} onChange={(_, newValue) => setEditData({ ...editData, avgRating: newValue })} readOnly={!ratingMode} />
                    </CardContent>
                    <CardActions>
                        {!ratingMode && !isNew && <Button size="small" onClick={() => setRatingmode(true)}>Rate Now</Button>}
                        {ratingMode && !isNew && <Button size="small" onClick={addRating}>Done</Button>}
                        {user.isManager && !isNew && <Button size="small" onClick={() => setEditMode(!isEditMode)}>{isEditMode ? 'Cancel' : 'Edit'}</Button>}
                        {user.isManager && isEditMode ? <Button size="small" type="submit">Submit</Button> : <Button size="small" onClick={handleDelete}>Delete</Button>}
                        {!isEditMode && bikeData.isAvailable && canBookNow && <Button size="medium" type="submit" onSubmit={handleBooking}>Book Now</Button>}
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    </>
}