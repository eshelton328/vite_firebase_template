import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Home from './pages/Home';
import Login from "./pages/SignIn";
import Register from "./pages/SignUp";
import { AuthContextProvider, UserAuth } from "./context/AuthContext";

const App = () => {
    const user = UserAuth();
    if (!user) {
        console.log("no user")
    }

    return (
        <AuthContextProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/signin" element={<Login />}/>
                    <Route path="/signup" element={<Register />}/>
                </Routes>
            </Router>
        </AuthContextProvider>
    );
}

export default App;
