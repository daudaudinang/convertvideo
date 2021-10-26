const initialState = {
    listFile:[]
}

const fileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_FILE':{
            const newList = action.payload;

            return {
                ...state,
                listFile: newList
            }
        }
        case 'REMOVE_FILE':{
            const newList = action.payload;

            return {
                ...state,
                listFile: newList
            }
        }
        case 'RESET_LIST_FILE':{
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

export default fileReducer;
