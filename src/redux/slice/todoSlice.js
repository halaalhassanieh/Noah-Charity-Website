import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
name:todo,
initialState:[],
reducers:{

  addtodo : (state,action)=>{

     state.push({id:Date.now(),text:action.payload,completed:false});
  },
  
  deletetodo:(state,action)=>{
    return state.filter(todo=>todo.id !==action.payload);
  },

},

});
export const {addtodo,deletetodo} = todoSlice.actions;
export default todoSlice.reducer;