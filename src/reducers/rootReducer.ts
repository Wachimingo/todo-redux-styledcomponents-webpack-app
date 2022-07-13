import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {

};

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        todoAdded(state: any, action: any) {
            const todos = action.payload;
            todos.map((todo: any) => {
                return state[todo.id] = todo;
            })
        },
        todoUpdateState(state: any, action: any) {
            state[action.payload.id].state = action.payload.state;
        },
        todoUpdateItem(state: any, action: any) {
            state[action.payload.id] = action.payload;
        },
    }
});

export const { todoAdded, todoUpdateState, todoUpdateItem } = todosSlice.actions;
export default todosSlice.reducer;