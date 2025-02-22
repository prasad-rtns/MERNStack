import { createStore } from 'redux';

// Reducer function
const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
    console.log("--counterReducer--");
    console.log(action);
    console.log(state);
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT':
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
    
}

// Create Redux store
const store = createStore(counterReducer);

export default store;