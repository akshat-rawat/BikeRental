/**
 * Filter components
 */
import React, { useState } from "react";
import { TextField, Slider, Typography, Button, Box } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { toast } from "react-toastify";

export default function Filter({ setFilterData }) {
    const [data, setData] = useState({
        model: "",
        color: "",
        location: "",
        avgRating: 0,
        fromDate: null,
        toDate: null
    });

    const handleSubmit = () => {
        setFilterData({ ...data });
        toast.success("Data Filtered!");
    }

    return <>
        <TextField margin="normal" id="standard-basic" label="Model" variant="standard" value={data.model} onChange={(e) => setData({ ...data, model: e.target.value })} />
        <TextField margin="normal" id="standard-basic" label="Color" variant="standard" value={data.color} onChange={(e) => setData({ ...data, color: e.target.value })} />
        <TextField margin="normal" id="standard-basic" label="Location" variant="standard" value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })} />

        <Box width={500} margin="normal" >
            <Typography id="non-linear-slider" gutterBottom>
                Rate Averages
            </Typography>
            <Slider
                aria-label="Rate Averages"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={5}
                onChange={(e) => setData({ ...data, avgRating: e.target.value })}
            />
        </Box>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                margin="normal"
                renderInput={(props) => <TextField {...props} />}
                label="From"
                maxDate={data.toDate}
                value={data.fromDate}
                onChange={(newValue) => {
                    setData({ ...data, fromDate: newValue });
                }}
            />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                margin="normal"
                renderInput={(props) => <TextField {...props} />}
                label="To"
                minDate={data.fromDate}
                value={data.toDate}
                onChange={(newValue) => {
                    setData({ ...data, toDate: newValue });
                }}
            />
        </LocalizationProvider> <br />
        <Button margin="normal" variant="outlined" onClick={handleSubmit}>Submit</Button>
    </>;
}