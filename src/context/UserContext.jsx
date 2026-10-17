import { createContext, useContext, useReducer} from 'react';
import { userReducer } from './userReducer.js';
import { initialUsers,usersReducer } from './usersReducer.js';

const UserContext = createContext(null);

const initialState={
    name: "Arjun",
    role: 'Developer',
};

export function UserProvider({ children }) {
    const [user, dispatch] = useReducer(userReducer, initialState);
    const [users, dispatchUsers] = useReducer(usersReducer, initialUsers);
    

    return (
        <UserContext.Provider value={{ user,dispatch,users,dispatchUsers}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}