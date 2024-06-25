import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const PrivateRoute = ({ page }: { page: React.JSX.Element}) => {
    const userAuth = UserAuth();
    const user = userAuth?.user ?? null;
    const loading = userAuth?.loading ?? true;

    const navigate = useNavigate();

    useEffect(() => {
        if (!user && !loading) {
            navigate('/signin');
        }
    }, [user, loading, navigate])

    return user ? page : null;
}

export default PrivateRoute;
