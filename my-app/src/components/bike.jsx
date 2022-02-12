/**
 * To render a single bike, handle edit and update of bike,
 * to be used on bike list page
 */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TextField, Rating, Box, Card, CardActions, CardContent, Button, Typography, Checkbox } from "@mui/material";


export default function Bike({
    bikeData,
    isNew,
    reload,
    canBookNow
}) {
    const [isEditMode, setEditMode] = useState(isNew);
    const [editData, setEditData] = useState({
        avgRating: 0,
        model: "",
        color: "",
        location: "",
        isAvailable: false
    });

    useEffect(() => {
        if (bikeData) setEditData({ ...bikeData });
    }, [bikeData]);

    const handleDelete = () => {
        toast.success("Bike Deleted Successfully");
        reload();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isNew) {
            toast.success("Bike Added Successfully");
            reload();
            return;
        }
        toast.success("Bike Updated Successfully");
        reload();
    }

    const handleBooking = () => {
        toast.success("Bike Booked Successfully");
        reload();
    }

    return <>
        <Box sx={{ minWidth: 275 }} component="form" onSubmit={handleSubmit}>
            <Card variant="outlined">
                <React.Fragment>
                    {isEditMode ?
                        <CardContent>
                            <TextField margin="normal" required id="outlined-required" label="Model" value={editData.model} onChange={(e) => setEditData({ ...editData, model: e.target.value })} /> <br />
                            <Rating margin="normal" value={editData.avgRating} onChange={(_, newValue) => setEditData({ ...editData, avgRating: newValue })} /> <br />
                            <TextField margin="normal" required id="outlined-required" label="Color" value={editData.color} onChange={(e) => setEditData({ ...editData, color: e.target.value })} /> <br />
                            <TextField margin="normal" required id="outlined-required" label="Location" value={editData.location} onChange={(e) => setEditData({ ...editData, location: e.target.value })} />
                            <Typography variant="h6">
                                <Checkbox checked={editData.isAvailable} onChange={e => { setEditData({ ...editData, isAvailable: e.target.checked }) }} />
                                Available
                            </Typography>
                        </CardContent> :
                        <CardContent>
                            <Typography variant="h4" component="div">
                                {bikeData.model}
                            </Typography>
                            <Rating name="read-only" value={bikeData.avgRating} readOnly />
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
                        </CardContent>
                    }
                    <CardActions>
                        {!isNew && <Button size="small" onClick={() => setEditMode(!isEditMode)}>{isEditMode ? 'Cancel' : 'Edit'}</Button>}
                        {isEditMode ? <Button size="small" type="submit">Submit</Button> : <Button size="small" onClick={handleDelete}>Delete</Button>}
                        {!isEditMode && bikeData.isAvailable && canBookNow && <Button size="medium" type="submit" onSubmit={handleBooking}>Book Now</Button>}
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    </>
}