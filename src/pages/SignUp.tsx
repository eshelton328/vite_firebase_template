import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const userAuth = UserAuth();
    const createUser = userAuth?.createUser ?? (() => {});

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await createUser(email, password);
            return navigate('/');
        } catch (err) {
            console.log(err)
            setError((err as Error)?.message);
        }
    };

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">submit</button>
                {error && <p>{error}</p>}
            </form>
            <p>Already have an account? <a href="/signin">Sign In</a></p>
        </>
    );
};

export default SignUp;
