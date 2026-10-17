export function userReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_NAME':
            return {
                ...state,
                name: state.name === 'Arjun' ? 'Rahul' : 'Arjun',
            };

        case 'CHANGE_ROLE':
            return {
                ...state,
                role: action.payload,
            };

        case 'RESET':
            return {
                name: 'Arjun',
                role: 'Developer',
            };

        default:
            return state;
    }
}