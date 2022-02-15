import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";

import useAuth from "../hooks/useAuth";
import { Api } from "../service/api";
import User from "../components/user";

export default function UserPage() {
    const [usersData, setUsersData] = useState(null);
    const [pages, setPages] = useState({ currPage: 1, totalPages: 3 });
    const [bit, setBit] = useState(true);

    const [user] = useAuth()

    useEffect(() => {
        Api.getUsers({ page: pages.currPage }, user)
            .then((res) => {
                setUsersData(res);
                setPages({ currPage: res.data.page, totalPages: res.data.pageCount })
            })
            .catch(err => toast.error(err?.response?.data?.message || "Something went wrong"));
    }, [pages.currPage, bit, user]);

    const reload = () => setBit(!bit);

    if (!usersData) return <></>;
    return <>
        <User isNew={true} reload={reload} />
        {usersData.data.users.map(userData =>
            <User key={userData.id} userData={userData} reload={reload} isNew={false} />
        )}
        <Pagination
            count={pages.totalPages}
            page={pages.currPage}
            onChange={(_, cpage) => setPages({ ...pages, currPage: cpage })}
            color="primary"
        />
    </>
}