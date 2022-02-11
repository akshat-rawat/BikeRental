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
    reload
}) {
    const [isEditMode, setEditMode] = useState(isNew);
    const [editData, setEditData] = useState({
        name: "",
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

    const handleSubmit = () => {
        console.log(editData);
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
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <React.Fragment>
                    {isEditMode ?
                        <CardContent>
                            <TextField id="outlined-text" label="Name" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} /> <br />
                            <Rating value={editData.avgRating} onChange={(_, newValue) => setEditData({ ...editData, rating: newValue })} /> <br />
                            <TextField id="outlined-text" label="Model" value={editData.model} onChange={(e) => setEditData({ ...editData, model: e.target.value })} /> <br />
                            <TextField id="outlined-text" label="Color" value={editData.color} onChange={(e) => setEditData({ ...editData, color: e.target.value })} /> <br />
                            <TextField id="outlined-text" label="Location" value={editData.location} onChange={(e) => setEditData({ ...editData, location: e.target.value })} />
                            <Typography variant="h6">
                                <Checkbox checked={editData.isAvailable} onChange={e => { setEditData({ ...editData, isAvailable: e.target.checked }) }} />
                                Available
                            </Typography>
                        </CardContent> :
                        <CardContent>
                            <Typography variant="h4" component="div">
                                {bikeData.name}
                            </Typography>
                            <Rating name="read-only" value={bikeData.avgRating} readOnly />
                            <Typography variant="h6">
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
                        </CardContent>
                    }
                    <CardActions>
                        {!isNew && <Button size="small" onClick={() => setEditMode(!isEditMode)}>{isEditMode ? 'Cancel' : 'Edit'}</Button>}
                        {isEditMode ? <Button size="small" onClick={handleSubmit}>Submit</Button> : <Button size="small" onClick={handleDelete}>Delete</Button>}
                        {!isEditMode && <Button size="medium" onClick={handleBooking}>Book Now</Button>}
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    </>
}