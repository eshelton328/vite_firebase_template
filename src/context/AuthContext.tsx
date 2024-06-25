import { createContext, useContext, useState, useEffect } from 'react'
import { User as FirebaseUser } from 'firebase/auth';
import { firebase } from '../lib/firebase';

// TODO: implement forgot password

interface UserContextType {
    user: FirebaseUser | null;
    loading: boolean;
    createUser: (email: string, password: string) => Promise<unknown>;
    signInUser: (email: string, password: string) => Promise<unknown>;
    signOutUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email: string, password: string) => {
        return firebase.createUser(email, password);
    };

    const signInUser = (email: string, password: string) => {
        return firebase.signInUser(email, password)
    };

    const signOutUser = () => {
        return firebase.signOutUser()
    }

    useEffect(() => {
        return () => firebase.unsubscribe((currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, createUser, signInUser, signOutUser }}>
            {children}
        </UserContext.Provider>
    );
};


export const UserAuth = () => {
    return useContext(UserContext);
}
