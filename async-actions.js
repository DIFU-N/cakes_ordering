const redux = require('redux');
const createStore = redux.createStore;
const axios = require('axios');
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;

const initialState = {
    loading: false,
    users: [],
    error: "",
}

const fetchUsersRequested = "fetch users requested";
const fetchUsersSucceeded = "fetch users succeeded";
const fetchUsersFailed = "fetch users failed";

const fetchUsersRequest = () => {
    return {
        type: fetchUsersRequested,
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: fetchUsersSucceeded,
        payload: users,
    }
}

const fetchUsersFails = (error) => {
    return {
        type: fetchUsersFailed,
        payload: error,
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case fetchUsersRequested:
            return {
                ...state,
                loading: true,
            }
        case fetchUsersSucceeded:
            return {
                ...state,
                loading: false,
                users: action.payload,
            }
        case fetchUsersFailed:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            break;
    }
}

const fetchUsers = () => {
    //dispatch sets up an event handler
    return function(dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
            //response.data is the users
            const users = response.data.map((users) => users.id)
            dispatch(fetchUsersSuccess(users));
        }).catch(error => {
            //error message is the error message.. bars!!
            dispatch(fetchUsersFails(error.message))
        })
    }
}

//The thunkMiddleware lets an action creator call a funtion instead of an action
const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(() => {console.log(store.getState());})

store.dispatch(fetchUsers())