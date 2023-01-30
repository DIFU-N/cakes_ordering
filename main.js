const redux = require('redux');
const createStore = redux.createStore;

const cakeOrdered = 'Cake Ordered';
const cakeRestocked = 'Cake Restocked';

let cakesSold = 0;
//to implement an action, an action creator needs to be created.
// JS APP - Action - Reducer - State

//Action Implemented
const orderCake = () => {
    cakesSold +=1;
    return {
        type: cakeOrdered,
        payload: 1
    }
}

const restockCake = (qty = 1) => {
    return {
        type: cakeRestocked,
        payload: qty
    }
}

const initialState = {
    numOfCakes: 10
}

// Reducers Update the current state of the application.
// Reducer Implemented
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case cakeOrdered:
            return { 
                numOfCakes: state.numOfCakes - 1
            }
        case cakeRestocked:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default: 
            return state;
    }
}

// handling a stateobject change with more than 1 property
const initialState2 = {
    numOfCakes: 10,
    anotherProperty: 0
}

//to handle this, it's good to create a copy of the state object
const reducer2 = (state = initialState, action) => {
    switch (action.type) {
        case cakeOrdered:
            return {
                ...state, // this spread operator creates a copy of the state object
                // it would just print out:
                // numOfCakes: 10,
                // anotherProperty: 0,
                // then it updates the one you want to update  
                numOfCakes: state.numOfCakes - 1
            }
        default: 
            return state;
    }
}

//creating the store
// Store Responsibilities
// Hold APP State
// Allow access to state via getState()
// allow state to be updated via dispatch(action)
//Register listeners via subscribe(listener)
// Handle unrregistering of listeners via the fxn returned by subscribe(listener)

// Hold App State
const store = createStore(reducer);

// Allow access to state 
console.log('Initial State', store.getState());

// jump to step  for now 
// Register Listeners via subscribe(listener)
store.subscribe(() => console.log('update state', store.getState()))

// Dispatch method accepts a function as a parameter, create the fxn there or 
//use an already created one, there is a created one in this case
store.dispatch(orderCake())
//to cause more state changes:
store.dispatch(orderCake())
store.dispatch(orderCake())


//restocking the cakes
store.dispatch(restockCake(cakesSold));

// for the unsubscribe method, just call the function that is returned from the subscribe method 
const unsubscribe = store.subscribe(() => console.log('update state', store.getState()))

unsubscribe();

