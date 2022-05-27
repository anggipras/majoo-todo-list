const INITIAL_STATE = {
    toDoList: [{
        id : 0,
        title : "",
        description : "",
        status : 0,
        createdAt : ""
    }],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "TODOLIST":
            return { ...state, toDoList: action.payload }
        default:
            return state
    }
}