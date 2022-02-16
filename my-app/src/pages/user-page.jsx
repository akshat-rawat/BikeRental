import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Pagination, Typography } from "@mui/material";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import useAuth from "../hooks/useAuth";
import { Api } from "../service/api";
import User from "../components/user";

export default function UserPage() {
    const [usersData, setUsersData] = useState(null);
    const [pages, setPages] = useState({ currPage: 1, totalPages: 3 });
    const [bit, setBit] = useState(true);
    const [addToggle, setAddToggle] = useState(false);

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
        <StyledComponents>
            <div className="container">
                {addToggle && <User isNew={true} reload={reload} setAddToggle={setAddToggle} />}
                {usersData.data.users.map(userData =>
                    <User key={userData.id} userData={userData} reload={reload} isNew={false} />
                )}

                <div className="pagination-style">
                        {usersData.data.users.length !== 0 ? <Pagination
                            count={pages.totalPages}
                            page={pages.currPage}
                            onChange={(_, cpage) => setPages({ ...pages, currPage: cpage })}
                            color="primary"
                        /> : <Typography variant="h4">No Users Found</Typography>}
                </div>
            </div>

            <div className="add-btn">
                <Button variant="outlined" onClick={() => setAddToggle(!addToggle)}>
                    {addToggle ? <RemoveIcon /> : <AddIcon />}
                </Button>
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