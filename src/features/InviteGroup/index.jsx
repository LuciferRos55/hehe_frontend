/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import groupApi from '../../api/groupApi';
import DetailPage from '../Group/pages/DetailPage';

function InviteGroup(props) {
    

    const { enqueueSnackbar } = useSnackbar();
    const { groupId } = useParams();
    const [invite, setInvite] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await groupApi.inviteGroupLink(groupId);
                if (response.status === true) {
                    setInvite(true);
                    navigate(`/groups/${groupId}`);
                }
            } catch (error) {
                console.log("failed");
                enqueueSnackbar("You are already this group's member", {
                    variant: "error",
                    autoHideDuration: 1000
                });
            }
        })();
    }, []);

    return (
        <div>
            {invite ?
                <Routes>
                    <Route path="" exact element={<DetailPage />} />
                </Routes>
                :
                ""
            }
        </div>
    );
}

InviteGroup.propTypes = {

};

export default InviteGroup;