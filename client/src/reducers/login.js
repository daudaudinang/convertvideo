const initialState = {
    isLogin: (localStorage.getItem('isLogin')) ? localStorage.getItem('isLogin') : false,
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':{
            const newState = {isLogin: true};
            return newState;
        }

        case 'LOGOUT': {
            const newState = {isLogin: false};
            return newState;
        }
        
        default:
            return state;
    }
}

export default loginReducer;