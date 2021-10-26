const initialState = {
    listUser:[]
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_USER':{
            const newList = action.payload;

            return {
                ...state,
                listUser: newList
            }
        }
        case 'REMOVE_USER':{
            const newList = action.payload;

            return {
                ...state,
                listUser: newList
            }
        }
        case 'RESET_LIST_USER':{
            const newList = [];

            return {
                ...state,
                listFile: newList
            }
        }
        default:
            return state;
    }
}

export default userReducer;