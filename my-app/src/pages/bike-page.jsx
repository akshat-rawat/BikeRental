import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Pagination, Typography } from "@mui/material";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import useAuth from "../hooks/useAuth";
import { Api } from "../service/api";
import Filter from "../components/filter";
import Bike from "../components/bike";


export default function BikePage() {
    const [bikesData, setBikesData] = useState(null);
    const [pages, setPages] = useState({ currPage: 1, totalPages: 3 });
    const [bit, setBit] = useState(true);
    const [filterData, setFilterData] = useState({});
    const [addToggle, setAddToggle] = useState(false);

    const [user] = useAuth();

    useEffect(() => {
        Api.getBikes({ page: pages.currPage, ...filterData }, user)
            .then((res) => {
                setBikesData(res);
                setPages({ currPage: res.data.page, totalPages: res.data.pageCount });
                if (res.data.page > 1 && res.data.bikes.length === 0)
                    setPages({ totalPages: res.data.pageCount, currPage: res.data.page - 1 });
            })
            .catch(err => toast.error(err?.response?.data?.message || "Something went wrong"));
    }, [pages.currPage, bit, user, filterData]);

    const reload = () => setBit(!bit);

    const handleBooking = (id) => {
        if (!filterData || !filterData.fromDateTime || !filterData.toDateTime) 
            return toast.error("Please enter from and to dates");
        Api.bookBike(id, filterData, user)
            .then(() => {
                toast.success("Bike Booked Successfully");
                reload();
            })
            .catch(err => toast.error(err?.response?.data?.message || "Something went wrong"));
    }

    if (!bikesData) return <></>
    return <>
        <StyledComponents>
            <div className="container">
                <div className="left-side">
                    <Filter setFilterData={setFilterData} />
                </div>

                <div className="right-side">
                    {addToggle && <Bike isNew={true} reload={reload} setAddToggle={setAddToggle} />}
                    {bikesData.data.bikes.map(bike =>
                        <Bike key={bike.id} bikeData={bike} reload={reload} handleBooking={handleBooking} canBookNow={filterData?.fromDateTime && filterData?.toDateTime} />
                    )}

                    <div className="pagination-style">
                        {bikesData.data.bikes.length !== 0 ? <Pagination
                            count={pages.totalPages}
                            page={pages.currPage}
                            onChange={(_, cpage) => setPages({ ...pages, currPage: cpage })}
                            color="primary"
                        /> : <Typography variant="h4">No Bikes Found</Typography>}
                    </div>
                </div>
            </div>

            {user.isManager && <div className="add-btn">
                <Button variant="outlined" onClick={() => setAddToggle(!addToggle)}>
                    {addToggle ? <RemoveIcon /> : <AddIcon />}
                </Button>
            </div>}
        </StyledComponents>
    </>;
}


const StyledComponents = styled.div`
    // width:50%;
    margin:0 auto;

    .pagination-style{
        // background:yellow;
        margin:25px 0;
        display:flex;
        justify-content:center;
    }

    .container{
        // background:red;
        display:flex;
        margin: 30px auto;
        width: 80%;
        padding: 20px;
    }

    .left-side{ 
        display:flex;
        flex-direction: column;
        justify-content: center;
        position:sticky;
        top:40px;
        width:40%;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        // border:1px solid black;
        margin:30px 0;
        padding:20px;
        min-height:400px;
        height:550px;
        // height: 70vh;
        
    }

    .right-side{ 
        // background:green;
        width:50%;
        margin-left:80px;
    }

    .add-btn{
        position:fixed;
        bottom:12px;
        right:40px;
    }

`