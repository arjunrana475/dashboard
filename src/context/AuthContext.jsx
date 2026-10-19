import {
    createContext,
    useContext,
    useState,
} from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(
        () => localStorage.getItem('token')
    );

    const [authUser, setAuthUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('authUser');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch {
            return null;
        }
    });

    function login(data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('authUser', JSON.stringify(data.user));

        setToken(data.token);
        setAuthUser(data.user);
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('authUser');

        setToken(null);
        setAuthUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                authUser,
                isAuthenticated: Boolean(token),
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
