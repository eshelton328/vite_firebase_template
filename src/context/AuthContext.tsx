import { createContext, useContext, useState, useEffect } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../services/firebase';

interface UserContextType {
    user: FirebaseUser | null;
    createUser: (email: string, password: string) => Promise<unknown>;
    signInUser: (email: string, password: string) => Promise<unknown>;
    signOutUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<FirebaseUser | null>(null);

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
        });
        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, createUser, signInUser, signOutUser }}>
            {children}
        </UserContext.Provider>
    );
};


export const UserAuth = () => {
    return useContext(UserContext);
}
