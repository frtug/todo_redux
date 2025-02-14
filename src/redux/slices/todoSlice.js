import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name:'todos',
  initialState:{
    todos:[]
  },
  reducers:{
    addTodo: (state, action)=> {
            state.todos.push({
              id: Date.now(),
              text: action.payload,
              completed: false,
              value:1
            })        
  },
  deleteTodo: (state, action) => {
    state.todos = state.todos.filter((todo) => todo.id !== action.payload);
  },
  toggleCompleteTodo: (state, action) => {
    state.todos = state.todos.map((todo)=> 
        
    (todo.id === action.payload) ?
        {
          ...todo,
          completed:!todo.completed
        }
        :
         todo
      )
  },
  updateTodo:(state,action)=>{
    console.log(action.payload)
    state.todos = state.todos.map((todo) => 
      (todo.id === action.payload.id) ?
    { ...todo,
      text:action.payload.updatedText
    }:
    todo
    )
  },
  countIncrease :(state,action)=>{
    state.todos = state.todos.map((todo)=>
      (todo.id === action.payload) ?
       {...todo,value:todo.value+1}
       :
       todo
    )
  },
  countDecrease :(state,action)=>{
    state.todos = state.todos.map((todo)=>
      (todo.id === action.payload) ?
       {...todo,value:todo.value-1}
       :
       todo
    )
  }
},
});
export const {addTodo,deleteTodo,toggleCompleteTodo,updateTodo,countDecrease,countIncrease} = todoSlice.actions;
export default todoSlice.reducer
