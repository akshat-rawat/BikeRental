/**
 * Filter components
 */
import React, { useState } from "react";
import { TextField, Slider, Typography, Button, Box } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import styled from "styled-components"

export default function Filter({ addFilter }) {
    const [data, setData] = useState({
        model: "",
        color: "",
        location: "",
        minRating: 0,
        fromDateTime: null,
        toDateTime: null
    });

    const handleSubmit = () => addFilter({ ...data });
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
                        Minimum Rating
                    </Typography>
                    <Slider
                        sx={{ margin: '5px 0' }}
                        aria-label="Min Rating"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={0}
                        max={5}
                        onChange={(e) => setData({ ...data, minRating: e.target.value })}
                    />
                </Box>
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    margin="normal"
                    renderInput={(props) => <TextField {...props} />}
                    label="From"
                    maxDateTime={new Date(data.toDateTime?.getTime() - 86400000)}
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
                    minDateTime={Math.max(Date.now(), new Date(data.fromDateTime?.getTime() + 86400000)) || Date.now()}
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