export const saveUser = (listUser) => {
    return {
        type: 'SAVE_USER',
        payload: listUser,
    }
}

export const removeUser = (listUser) => {
    return {
        type: 'REMOVE_USER',
        payload: listUser
    }
}

export const resetListUser = () => {
    return {
        type: 'RESET_LIST_USER',
        payload: []
    }
}