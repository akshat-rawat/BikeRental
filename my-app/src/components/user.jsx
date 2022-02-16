/**
 * To render a single user, handle add and update of use,
 * to be used on user list page
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { toast } from "react-toastify";
import { TextField, Box, Card, CardActions, CardContent, Button, Typography, Checkbox } from "@mui/material";
import styled from "styled-components";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { Api } from "../service/api";
import useAuth from "../hooks/useAuth";

export default function User({
    userData,
    isNew,
    reload,
    setAddToggle
}) {
    const [isEditMode, setEditMode] = useState(isNew);
    const [editData, setEditData] = useState({
        name: "",
        email: "",
        password: "",
        isManager: false
    });

    const navigate = useNavigate();
    const [user, setUser] = useAuth();
    const [coookies, setCookie, removeCookie] = useCookies(["user"]);

    const logoutUser = () => { 
        removeCookie("user");
        setUser(null);
        navigate("/");
    }

    useEffect(() => {
        if (userData) setEditData({ ...userData, password: "" });
    }, [userData]);

    const handleDelete = () => {
        Api.deleteUser(editData.id, user)
            .then(() => {
                toast.success("User Deleted Successfully");
                if (editData.id === user.id) logoutUser();
                reload();
            })
            .catch(err => toast.error(err?.response?.data?.message || "Something went wrong"));
    }

    const addUser = () => {
        Api.addUser(editData, user)
            .then(() => {
                toast.success("User Added Successfully");
                reload();
            })
            .catch(err => toast.error(err?.response?.data?.message || "Something went wrong"));
        setAddToggle(false);
    }

    const updateUser = () => {
        Api.updateUser(editData.id, editData, user)
            .then(() => {
                toast.success("User Updated Successfully");
                reload();
                if (editData.isManager === false) logoutUser();
                setEditMode(false);
            })
            .catch(err => toast.error(err?.response?.data?.message || "Something went wrong"));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        isNew ? addUser() : updateUser();
    }

    return <>
        <StyledComponents>
            <div className="user-card">
                <Box sx={{ minWidth: 275 }} component="form" onSubmit={handleSubmit}>
                    <Card variant="outlined" sx={{ padding: "10px" }}>
                        <React.Fragment>
                            {isEditMode ?
                                <CardContent sx={{ paddingBottom: "0" }}>
                                    <TextField fullWidth required margin="normal" id="outlined-text" label="Name" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} /> <br />
                                    <TextField fullWidth required margin="normal" id="outlined-email" label="Email" type="email" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} /> <br />
                                    {isNew && <TextField fullWidth required margin="normal" id="outlined-password" label="Password" type="password" value={editData.password} onChange={(e) => setEditData({ ...editData, password: e.target.value })} />} <br />
                                </CardContent> :
                                <CardContent sx={{ paddingBottom: "0" }}>
                                    <div className="user-header">
                                        <Typography variant="h5" component="div">
                                            {userData.name}
                                        </Typography>
                                        <Typography variant="p">
                                            {userData.email}
                                        </Typography>
                                    </div>
                                </CardContent>
                            }
                            <CardContent sx={{ paddingTop: "0", paddingBottom: "0" }}>
                                <Typography variant="p">
                                    Manager
                                    <Checkbox readOnly={!isEditMode} checked={isEditMode ? editData.isManager : userData.isManager} onChange={e => isEditMode && setEditData({ ...editData, isManager: e.target.checked })} />
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <div className="user-actions">
                                    {user.isManager && <Button sx={{ padding: "0" }} size="medium" onClick={() => navigate(`/reservations?userId=${userData.id}`)}>See Reservations</Button>}
                                    <div>
                                        {!isNew && <Button size="small" onClick={() => { setEditMode(!isEditMode); reload(); }}>{isEditMode ? <CloseIcon color="error" /> : <EditIcon />}</Button>}
                                        {isEditMode ? <Button size="small" type="submit"><DoneIcon color="success" /></Button> : <Button size="small" onClick={handleDelete}><DeleteIcon color="error" /></Button>}
                                    </div>
                                </div>
                            </CardActions>
                        </React.Fragment>
                    </Card>
                </Box>
            </div>
        </StyledComponents>
    </>
}


const StyledComponents = styled.div`

    margin:15px 0 ;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    // background: red;

    .user-header { 
        display:flex;
        justify-content: space-between;
        padding-bottom: 0px;
        
    }

    .user-actions { 
        // background: red;
        width: 100%;
        display:flex;
        padding: 0 8px;
        justify-content: space-between;
    }

`