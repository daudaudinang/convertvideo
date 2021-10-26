export const saveFile = (listFile) => {
    return {
        type: 'SAVE_FILE',
        payload: listFile,
    }
}

export const removeFile = (newList) => {
    return {
        type: 'REMOVE_FILE',
        payload: newList
    }
}

export const resetListFile = () => {
    return {
        type: 'RESET_LIST_FILE',
        payload: []
    }
}

export const resetListUser = () => {
    return {
        type: 'RESET_LIST_USER',
        payload: []
    }
}