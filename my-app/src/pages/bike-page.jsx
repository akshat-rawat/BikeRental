import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";
import styled from "styled-components";

import useAuth from "../hooks/useAuth";
import { Api } from "../service/api";
import Filter from "../components/filter";
import Bike from "../components/bike";
import { Button } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


export default function BikePage() {
    const [bikesData, setBikesData] = useState(null);
    const [pages, setPages] = useState({ currPage: 1, totalPages: 3 });
    const [bit, setBit] = useState(true);
    const [filterData, setFilterData] = useState({});
    const [addToggle, setAddToggle] = useState(false);

    const [user] = useAuth();

    useEffect(() => {
        Api.getBikes({ page: pages.currPage }, user)
            .then((res) => {
                setBikesData(res);
                setPages({ currPage: res.data.page, totalPages: res.data.pageCount })
            })
            .catch(err => toast.error(err?.response?.data?.message || "Something went wrong"));
    }, [pages.currPage, bit, user]);

    const reload = () => setBit(!bit);

    const handleBooking = (id) => {
        Api.bookBike(id, filterData, user)
            .then(() => {
                toast.success("Bike Booked Successfully");
                reload();
            })
            .catch(err => toast.error(err?.response?.data?.message || "Something went wrong"));
    }

    if (!bikesData) return <></>;
    return <>
        <StyledComponents>
            <div className="container">
                <div className="left-side">
                    <Filter setFilterData={setFilterData} />
                </div>

                <div className="right-side">
                    {addToggle && <Bike isNew={true} reload={reload} />}
                    {bikesData.data.bikes.map(bike =>
                        <Bike key={bike.id} bikeData={bike} reload={reload} handleBooking={handleBooking} canBookNow={filterData && filterData.fromDateTime && filterData.toDateTime} />
                    )}

                    <div className="pagination-style">
                        <Pagination
                            count={pages.totalPages}
                            page={pages.currPage}
                            onChange={(_, cpage) => setPages({ ...pages, currPage: cpage })}
                            color="primary"
                        />
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