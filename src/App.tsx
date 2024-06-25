import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import './App.css';

import Home from './pages/Home';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { AuthContextProvider } from "./context/AuthContext";

const App = () => {

    return (
        <AuthContextProvider>
            <Router>
                <Routes>
                    <Route path="/signin" element={<PublicRoute page={<SignIn />} />}/>
                    <Route path="/signup" element={<PublicRoute page={<SignUp />} />} />
                    <Route path="/" element={<PrivateRoute page={<Home />} />}/>
                </Routes>
            </Router>
        </AuthContextProvider>
    );
}

export default App;
