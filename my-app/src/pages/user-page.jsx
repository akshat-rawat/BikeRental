import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";

import { Api } from "../service/api";
import User from "../components/user";

export default function UserPage() {
    const [usersData, setUsersData] = useState(null);
    const [pages, setPages] = useState({ currPage: 1, totalPages: 3 });
    const [bit, setBit] = useState(true);

    useEffect(() => {
        Api.getUsers({ page: pages.currPage })
            .then((res) => {
                setUsersData(res);
                setPages({ currPage: res.data.page, totalPages: res.data.pageCount })
            })
            .catch(err => toast.error(err));
    }, [pages.currPage, bit]);

    const reload = () => setBit(!bit);

    if (!usersData) return <></>;
    return <>
        <User isNew={true} reload={reload} />
        {usersData.data.users.map(user =>
            <User key={user.id} userData={user} reload={reload} />
        )}
        <Pagination
            count={pages.totalPages}
            page={pages.currPage}
            onChange={(_, cpage) => setPages({ ...pages, currPage: cpage })}
            color="primary"
        />
    </>
}