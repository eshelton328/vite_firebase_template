import { UserAuth } from "../context/AuthContext";

const Home = () => {
    const userAuth = UserAuth();
    const signOutUser = userAuth?.signOutUser ?? (() => {});

    return (
        <>
            <h1>Home Page</h1>
            <button onClick={signOutUser}>Sign Out</button>
        </>
    )
}

export default Home;
