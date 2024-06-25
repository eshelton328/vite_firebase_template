import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const PublicRoute = ({ page }: { page: React.JSX.Element}) => {
    const userAuth = UserAuth();
    const user = userAuth?.user ?? null;
    const loading = userAuth?.loading ?? true;

    const navigate = useNavigate();

    useEffect(() => {
        if (user && !loading) {
            navigate('/');
        }
    }, [user, loading, navigate])

    return user ? null : page;
}

export default PublicRoute;
