/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import groupApi from '../../api/groupApi';
import DetailPage from '../Group/pages/DetailPage';

function InviteGroup(props) {
    const { groupId } = useParams();
    const [invite, setInvite] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await groupApi.inviteGroupLink(groupId);
                if (response.status === true) {
                    setInvite(true);
                }
            } catch (error) {
                console.log("failed");
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