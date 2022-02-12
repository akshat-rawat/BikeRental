/**
 * To render a single user, handle add and update of use,
 * to be used on user list page
 */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TextField, Box, Card, CardActions, CardContent, Button, Typography, Checkbox } from "@mui/material";

export default function User({
    userData,
    isNew,
    reload
}) {
    const [isEditMode, setEditMode] = useState(isNew);
    const [editData, setEditData] = useState({
        name: "",
        email: "",
        password: "",
        isManager: false
    });

    useEffect(() => {
        if (userData) setEditData({ password: "", ...userData });
    }, [userData]);

    const handleDelete = () => {
        toast.success("User Deleted Successfully");
        reload();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isNew) {
            toast.success("User Added Successfully");
            reload();
            return;
        }
        toast.success("User Updated Successfully");
        reload();
    }

    return <>
        <Box sx={{ minWidth: 275 }} component="form" onSubmit={handleSubmit}>
            <Card variant="outlined">
                <React.Fragment>
                    {isEditMode ?
                        <CardContent>
                            <TextField required margin="normal" id="outlined-text" label="Name" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} /> <br />
                            <TextField required margin="normal" id="outlined-email" label="Email" type="email" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} /> <br />
                            <TextField required margin="normal" id="outlined-password" label="Password" type="password" value={editData.password} onChange={(e) => setEditData({ ...editData, password: e.target.value })} /> <br />
                            <Typography variant="h6">
                                <Checkbox checked={editData.isManager} onChange={e => { setEditData({ ...editData, isManager: e.target.checked }) }} />
                                Manager
                            </Typography>
                        </CardContent> :
                        <CardContent>
                            <Typography variant="h4" component="div">
                                {userData.name}
                            </Typography>
                            <Typography variant="h6">
                                {userData.email}
                            </Typography>
                            <Typography variant="h6">
                                <Checkbox disabled checked={userData.isManager} />
                                Manager
                            </Typography>
                        </CardContent>
                    }
                    <CardActions>
                        {!isNew && <Button size="small" onClick={() => setEditMode(!isEditMode)}>{isEditMode ? 'Cancel' : 'Edit'}</Button>}
                        {isEditMode ? <Button size="small" type="submit">Submit</Button> : <Button size="small" onClick={handleDelete}>Delete</Button>}
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    </>
}