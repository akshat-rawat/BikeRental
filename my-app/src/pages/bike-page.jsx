import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";

import useAuth from "../hooks/useAuth";
import { Api } from "../service/api";
import Filter from "../components/filter";
import Bike from "../components/bike";

export default function BikePage() {
    const [bikesData, setBikesData] = useState(null);
    const [pages, setPages] = useState({ currPage: 1, totalPages: 3 });
    const [bit, setBit] = useState(true);
    const [filterData, setFilterData] = useState({});

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
        <Filter setFilterData={setFilterData} />
        <Bike isNew={true} reload={reload} />
        {bikesData.data.bikes.map(bike =>
            <Bike key={bike.id} bikeData={bike} reload={reload} handleBooking={handleBooking} canBookNow={filterData && filterData.fromDateTime && filterData.toDateTime} />
        )}
        <Pagination
            count={pages.totalPages}
            page={pages.currPage}
            onChange={(_, cpage) => setPages({ ...pages, currPage: cpage })}
            color="primary"
        />
    </>;
}