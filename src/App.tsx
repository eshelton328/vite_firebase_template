import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));

const App = () => {

    return (
        <AuthContextProvider>
            <Router>
                <Suspense fallback={<div></div>}>
                    <Routes>
                        <Route path="/signin" element={<PublicRoute page={<SignIn />} />}/>
                        <Route path="/signup" element={<PublicRoute page={<SignUp />} />} />
                        <Route path="/" element={<PrivateRoute page={<Home />} />}/>
                    </Routes>
                </Suspense>
            </Router>
        </AuthContextProvider>
    );
}

export default App;
