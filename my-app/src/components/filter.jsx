/**
 * Filter components
 */
import React, { useState } from "react";
import { TextField, Slider, Typography, Button, Box } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { toast } from "react-toastify";

export default function Filter() {
    const [filterData, setFilterData] = useState({
        model: "",
        color: "",
        location: "",
        avgRating: "",
        fromDate: new Date(),
        toDate: new Date()
    });

    const handleSubmit = () => {
        toast.success("Data Filtered!");
    }

    return <>
        <div>
            <TextField id="standard-basic" label="Model" variant="standard" value={filterData.model} onChange={(e) => setFilterData({ ...filterData, model: e.target.value })} />
            <TextField id="standard-basic" label="Color" variant="standard" value={filterData.color} onChange={(e) => setFilterData({ ...filterData, color: e.target.value })} />
            <TextField id="standard-basic" label="Location" variant="standard" value={filterData.location} onChange={(e) => setFilterData({ ...filterData, location: e.target.value })} />

            <Box width={500}>
                <Typography id="non-linear-slider" gutterBottom>
                    Rate Averages
                </Typography>
                <Slider
                    aria-label="Rate Averages"
                    defaultValue={3}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={5}
                    onChange={(e) => setFilterData({ ...filterData, avgRating: e.target.value })}
                />
            </Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="From"
                    maxDate={filterData.toDate}
                    value={filterData.fromDate}
                    onChange={(newValue) => {
                        setFilterData({ ...filterData, fromDate: newValue });
                    }}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="To"
                    minDate={filterData.fromDate}
                    value={filterData.toDate}
                    onChange={(newValue) => {
                        setFilterData({ ...filterData, toDate: newValue });
                    }}
                />
            </LocalizationProvider> <br />
            <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
        </div>
    </>;
}