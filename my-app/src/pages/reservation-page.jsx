import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom'
import { toast } from "react-toastify";
import { Pagination, Typography } from "@mui/material";
import styled from "styled-components";

import useAuth from "../hooks/useAuth";
import { Api } from "../service/api";
import Reservation from "../components/reservation";
import showErrorToast from "../utils/error";

export default function ReservationPage() {
    const [reservationsData, setReservationsData] = useState(null);
    const [pages, setPages] = useState({ currPage: 1, totalPages: 3 });
    const [bit, setBit] = useState(true);

    const [searchParams, _] = useSearchParams();
    const [user] = useAuth();

    useEffect(() => {
        Api.getReservations({ page: pages.currPage, bikeId: searchParams.get('bikeId'), userId: searchParams.get('userId') }, user)
            .then((res) => {
                setReservationsData(res);
                setPages({ currPage: res.data.page, totalPages: res.data.pageCount })
            })
            .catch(err => showErrorToast(err));
    }, [pages.currPage, bit, user]);

    const reload = () => setBit(!bit);

    if (!reservationsData) return <></>;
    return <>
        <StyledComponents>
            <div className="container">
                {reservationsData.data.reservations.map(reservation =>
                    <Reservation key={reservation.id} reservationData={reservation} reload={reload} />
                )}
                <div className="pagination-style">
                    {reservationsData.data.reservations.length !== 0 ? <Pagination
                        count={pages.totalPages}
                        page={pages.currPage}
                        onChange={(_, cpage) => setPages({ ...pages, currPage: cpage })}
                        color="primary"
                    /> : <Typography variant="h4">No Reservations Found</Typography>}
                </div>
            </div>
        </StyledComponents>
    </>
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
        flex-direction: column;
        margin: 30px auto;
        width: 50%;
        padding: 20px;
    }

    .add-btn{
        position:fixed;
        bottom:12px;
        right:60px;
    }

`