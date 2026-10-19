import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';

import { userReducer } from './userReducer.js';
import { usersReducer } from './usersReducer.js';
import { getUsers } from '../services/userApi.js';

const UserContext = createContext(null);

const initialState = {
    name: 'Arjun',
    role: 'Developer',
};

export function UserProvider({ children }) {
    const [user, dispatch] = useReducer(userReducer, initialState);

    const [users, dispatchUsers] = useReducer(usersReducer, []);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [usersError, setUsersError] = useState('');

    useEffect(() => {
        async function loadUsers() {
            try {
                const data = await getUsers();

                // Normalize MongoDB's _id to the id used by the existing UI.
                const normalizedUsers = data.map(user => ({
                    ...user,
                    id: user._id,
                }));

                dispatchUsers({
                    type: 'SET_USERS',
                    payload: normalizedUsers,
                });
            } catch (error) {
                setUsersError(
                    error.response?.data?.message ||
                    'Could not load users from the server.'
                );
            } finally {
                setLoadingUsers(false);
            }
        }

        loadUsers();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                dispatch,
                users,
                dispatchUsers,
                loadingUsers,
                usersError,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
