const initialUsers = [
  { id: 1, name: 'Arjun', email: 'arjun@example.com', role: 'Developer' },
  { id: 2, name: 'Aman', email: 'aman@example.com', role: 'Designer' },
  { id: 3, name: 'Rahul', email: 'rahul@example.com', role: 'Admin' },
];

export function usersReducer(state, action) {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.payload];

    case 'DELETE_USER':
      return state.filter(user => user.id !== action.payload);

    case 'UPDATE_USER':
      return state.map(user =>
        user.id === action.payload.id
          ? { ...user, ...action.payload }
          : user
      );

    default:
      return state;
  }
}

export { initialUsers };