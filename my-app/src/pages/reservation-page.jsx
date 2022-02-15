import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";

import useAuth from "../hooks/useAuth";
import { Api } from "../service/api";
import Reservation from "../components/reservation";

export default function ReservationPage() {
    const [reservationsData, setReservationsData] = useState(null);
    const [pages, setPages] = useState({ currPage: 1, totalPages: 3 });
    const [bit, setBit] = useState(true);

    const [user] = useAuth();

    useEffect(() => {
        Api.getReservations({ page: pages.currPage }, user)
            .then((res) => {
                setReservationsData(res);
                setPages({ currPage: res.data.page, totalPages: res.data.pageCount })
            })
            .catch(err => toast.error(err));
    }, [pages.currPage, bit, user]);

    const reload = () => setBit(!bit);

    if (!reservationsData) return <></>;
    return <>
        {reservationsData.data.reservations.map(reservation =>
            <Reservation key={reservation.id} reservationData={reservation} reload={reload} />
        )}
        <Pagination
            count={pages.totalPages}
            page={pages.currPage}
            onChange={(_, cpage) => setPages({ ...pages, currPage: cpage })}
            color="primary"
        />
    </>
}