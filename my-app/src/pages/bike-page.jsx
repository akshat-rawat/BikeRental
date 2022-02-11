import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";

import { Api } from "../service/api";
import Filter from "../components/filter";
import Bike from "../components/bike";

export default function BikePage() {
    const [bikesData, setBikesData] = useState(null);
    const [pages, setPages] = useState({ currPage: 1, totalPages: 3 });
    const [bit, setBit] = useState(true);

    useEffect(() => {
        Api.getBikes({ page: pages.currPage })
            .then((res) => {
                setBikesData(res);
                setPages({ currPage: res.data.page, totalPages: res.data.pageCount })
            })
            .catch(err => toast.error(err));
    }, [pages.currPage, bit]);

    const reload = () => setBit(!bit);

    if (!bikesData) return <></>;
    return <>
        <Filter />
        <Bike isNew={true} reload={reload} />
        {bikesData.data.bikes.map(bike =>
            <Bike key={bike.id} bikeData={bike} reload={reload} />
        )}
        <Pagination
            count={pages.totalPages}
            page={pages.currPage}
            onChange={(_, cpage) => setPages({ ...pages, currPage: cpage })}
            color="primary"
        />
    </>;
}