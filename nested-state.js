const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;

const initialState = {
    name: 'Roman Reigns',
    address: {
        street: 'Sami Zayns Head',
        city: 'Boston',
        state: 'MA',
    },
}
//Step 1: Define the const for the action type
const streetUpdated = 'Street Updated';

// step 2: Define the action creator which returns the action object 
const updateStreet = (street) => {
    return {
        type: streetUpdated,
        payload: street,
    }
}

// step 3: Define the reducer to handle this action 
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case streetUpdated:
            return {
                ...state,
                address: {
                    ...state.address,
                    street: action.payload,
                },
            }
        default: {
            return state
        }
    }
}

// step 4: create store and dispatch store 
const store = redux.createStore(reducer);
console.log('Initial State', store.getState());
const unsubscribe = store.subscribe(() => {
    console.log('Updated Store', store.getState());
})
store.dispatch(updateStreet('Nowhere'))
unsubscribe();