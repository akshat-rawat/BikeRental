/**
 * Filter components
 */
import React, { useState } from "react";
import { TextField, Slider, Typography, Button, Box } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { toast } from "react-toastify";
import styled from "styled-components"

export default function Filter({ setFilterData }) {
    const [data, setData] = useState({
        model: "",
        color: "",
        location: "",
        avgRating: 0,
        fromDateTime: null,
        toDateTime: null
    });

    const handleSubmit = () => {
        console.log(data.fromDateTime, data.toDateTime.toISOString());
        setFilterData({ ...data });
        toast.success("Data Filtered!");
    }

    return <>
        <StyledComponents>
            <h3>FILTER</h3>

            <div className="filter-contents">
                <TextField margin="normal" id="standard-basic" label="Model" variant="standard" value={data.model} onChange={(e) => setData({ ...data, model: e.target.value })} />
                <TextField margin="normal" id="standard-basic" label="Color" variant="standard" value={data.color} onChange={(e) => setData({ ...data, color: e.target.value })} />
                <TextField margin="normal" id="standard-basic" label="Location" variant="standard" value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })} />
            </div>

            <div className="filter-rating">
                <Box margin="normal" >
                    <Typography id="non-linear-slider" gutterBottom sx={{ marginTop: '20px' }}>
                        Min Rating
                    </Typography>
                    <Slider
                        sx={{ margin: '5px 0' }}
                        aria-label="Min Rating"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={5}
                        onChange={(e) => setData({ ...data, avgRating: e.target.value })}
                    />
                </Box>
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    margin="normal"
                    renderInput={(props) => <TextField {...props} />}
                    label="From"
                    maxDate={new Date(data.toDateTime?.getTime() - 86400000)}
                    value={data.fromDateTime}
                    onChange={(newValue) => {
                        setData({ ...data, fromDateTime: newValue });
                    }}
                />
            </LocalizationProvider> <br /> <br />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    margin="normal"
                    renderInput={(props) => <TextField {...props} />}
                    label="To"
                    minDate={new Date(data.fromDateTime?.getTime() + 86400000)}
                    value={data.toDateTime}
                    onChange={(newValue) => {
                        setData({ ...data, toDateTime: newValue });
                    }}
                />
            </LocalizationProvider> <br />

            <Button sx={{ marginTop: '20px', marginBottom: '20px' }} margin="normal" variant="outlined" onClick={handleSubmit}>Submit</Button>
        </StyledComponents>
    </>;
}


const StyledComponents = styled.div`
.filter-contents{
    display:flex;
    flex-direction:column;
}
`