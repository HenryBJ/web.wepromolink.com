import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";
import { getExternalId } from "../../services";
import PrivateProfile from "./PrivateProfile";
import PublicProfile from "./PublicProfile";
import Loader from "../../components/Loader";

export default function Index() {
    const [loading, setLoading] = useState(true);
    const [isPrivate, setIsPrivate] = useState(false);
    const [error, setError] = useState(false);

    const { id } = useParams();
    const { user } = useAuth();

    const getExtUserId = useMemo(() => {
        return getExternalId(user.uid)
    }, [user.uid]);

    useEffect(() => {
        getExtUserId.then(data => {
            let id2 = data.data;
            if (id === id2) {
                setIsPrivate(true);
                setLoading(false);
            } else {
                setIsPrivate(false);
                setLoading(false);
            }
        }).catch(err => setError(true));
    }, [id])

    return <>
        {loading && <Loader/>}
        {!loading && isPrivate &&<PrivateProfile/>}
        {!loading && !isPrivate &&<PublicProfile/>}
    </>
}