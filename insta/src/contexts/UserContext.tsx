import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../interfaces/unsplashInterfaces';

interface UserContextType {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
    login: (user: User) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    // For demo purposes, we'll simulate a logged-in user
    const [currentUser, setCurrentUser] = useState<User | null>({
        id: 1,
        username: 'demo_user',
        name: 'Demo User'
    });

    const login = (user: User) => {
        setCurrentUser(user);
    };

    const logout = () => {
        setCurrentUser(null);
    };

    return (
        <UserContext.Provider value={{
            currentUser,
            setCurrentUser,
            login,
            logout
        }}>
            {children}
        </UserContext.Provider>
    );
};
