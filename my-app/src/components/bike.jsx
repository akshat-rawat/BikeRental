/**
 * To render a single bike, handle edit and update of bike,
 * to be used on bike list page
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TextField, Rating, Box, Card, CardActions, CardContent, Button, Typography, Checkbox } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

import useAuth from "../hooks/useAuth"
import { Api } from "../service/api";
import styled from "styled-components";
import showErrorToast from "../utils/error";


export default function Bike({
    bikeData,
    isNew,
    reload,
    handleBooking,
    canBookNow,
    setAddToggle
}) {
    const [isEditMode, setEditMode] = useState(isNew);
    const [editData, setEditData] = useState({
        avgRating: 0,
        model: "",
        color: "",
        location: "",
        isAvailable: false
    });

    const navigate = useNavigate();
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
            .catch(err => showErrorToast(err));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isNew) {
            Api.addBike(editData, user)
                .then(() => {
                    toast.success("Bike Added Successfully");
                    reload();
                })
                .catch(err => showErrorToast(err));
            setAddToggle(false);
        } else {
            Api.updateBike(editData.id, editData, user)
                .then(() => {
                    toast.success("Bike Updated Successfully");
                    reload();
                })
                .catch(err => showErrorToast(err));
            setEditMode(false);
        }
    }

    return <>
        <StyledComponents>
            <Box sx={{ minWidth: 275 }} component="form" onSubmit={handleSubmit}>
                <Card variant="outlined">
                    <React.Fragment>
                        <CardContent className="contents">

                            <div className="inner-contents">
                                <div className="">
                                    {isEditMode ?
                                        <>
                                            <TextField fullWidth margin="normal" required id="outlined-required" label="Model" value={editData.model} onChange={(e) => setEditData({ ...editData, model: e.target.value })} /> <br />
                                            <TextField fullWidth margin="normal" required id="outlined-required" label="Color" value={editData.color} onChange={(e) => setEditData({ ...editData, color: e.target.value })} /> <br />
                                            <TextField fullWidth margin="normal" required id="outlined-required" label="Location" value={editData.location} onChange={(e) => setEditData({ ...editData, location: e.target.value })} />
                                            <Typography variant="h6">
                                                <Checkbox checked={editData.isAvailable} onChange={e => { setEditData({ ...editData, isAvailable: e.target.checked }) }} />
                                                Available
                                            </Typography>
                                        </> :
                                        <>
                                        <div className="heading">
                                            <Typography variant="h5" component="div" sx={{ marginBottom: '10px' }}>
                                                {bikeData.model}
                                            </Typography>
                                        </div>
                                            <div className="row">
                                                <Rating name="read-only" value={bikeData.avgRating} readOnly /> 
                                                <Typography variant="p">
                                                    {bikeData.color}
                                                </Typography> 
                                            </div>
                                            <div className="row">
                                                <Typography variant="p">
                                                    Available
                                                    <Checkbox readOnly checked={bikeData.isAvailable} />
                                                </Typography>
                                                <Typography variant="p">
                                                    {bikeData.location}
                                                </Typography> 
                                            </div>
                                        </>
                                    }
                                </div>

                            </div>

                        </CardContent>
                        <CardActions>
                            <div className="footer-left">
                            {user.isManager && !isEditMode && <Button size="medium" onClick={() => navigate(`/reservations?bikeId=${bikeData.id}`)}>See Reservations</Button>}
                            {!isEditMode && bikeData.isAvailable && canBookNow && <Button size="medium" onClick={() => handleBooking(bikeData.id)}>Book Now</Button>}
                            </div>
                            {user.isManager && <div className="footer-icons">
                                {!isNew && <Button size="small" onClick={() => setEditMode(!isEditMode)}>{isEditMode ? <CloseIcon color="error" /> : <EditIcon />}</Button>}
                                {isEditMode ? <Button size="small" type="submit"><DoneIcon color="success" /></Button> : <Button size="small" onClick={handleDelete}><DeleteIcon color="error" /></Button>}
                            </div>}
                        </CardActions>
                    </React.Fragment>
                </Card>
            </Box>
        </StyledComponents>
    </>
}


const StyledComponents = styled.div`

    margin:15px 0 ;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    .heading { 
        text-align: center;
    }

    .contents{
        padding:20px 20px 0 20px;
        line-height:2;
    }

   .footer-icons { 
       width: 100%;
    //    background: blue;
       display: flex;
       justify-content: flex-end;
   }

   .row { 
       display: flex;
       justify-content: space-between;
       font-size: 18px;
    }

    .footer-left { 
        display: flex;
        width: 500px;
    }


`