import { createContext, useContext, useState, useEffect } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../services/firebase';

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
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signInUser = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    };

    const signOutUser = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
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
