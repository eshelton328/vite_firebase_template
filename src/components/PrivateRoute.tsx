import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const PrivateRoute = ({ page }: { page: React.JSX.Element}) => {
    const userAuth = UserAuth();
    const user = userAuth?.user ?? null;

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/signin');
        }
    }, [user, navigate])

    return user ? page : null;
}

export default PrivateRoute;
