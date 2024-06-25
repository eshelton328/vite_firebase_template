import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const userAuth = UserAuth();
    const createUser = userAuth?.createUser ?? (() => {});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await createUser(email, password);
        } catch (err) {
            console.log(err)
            setError((err as Error)?.message);
        }
    };

    return (
        <>
            <h1>SignUp</h1>
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
        </>
    );
};

export default SignUp;
