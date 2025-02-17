import { useState } from 'react';
import { MoonStar, Plus, Sun } from 'lucide-react';
import './App.css';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { TodoApp } from './todoApp';
import { store } from './redux/store/store';
import useCustom from './hooks/useCustom';
import useTheme from './hooks/useTheme';

// Action Types
// const ADD_TODO = 'ADD_TODO';

// // Action Creators
// const addTodo = (text) => ({
//   type: ADD_TODO,
//   payload: text,
// });


// Reducer
// const initialState = {
//   todos: [],
//   // 
// };

// const todoReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_TODO:
//       return {
//         ...state,
//         todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }],
//       };
//     default:
//       return state;
//   }
// };

// // Combine Reducers
// const rootReducer = combineReducers({
//   todo: todoReducer, // Use `todo` as the key
// });


// const store = createStore(
//   todoReducer
// );

// Create Store
// const store = createStore(
//   todoReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

// TodoApp Component
const CustomHookComponent = ()=>{
  const url = `https://api.github.com/users/${frtug}`
  // TODO: 17 Feb -> Fetch the value from the above url and make a card shaped. For more information of the look of the page 
  // check on the telegram group for the UI of the app.
  const {data,loading} = useCustom(url)
  if(loading)  return <h1>Loading.....</h1>
  return(
    <div>
      <h1>Fetched Data</h1>
      <ul>
        {console.log(data)}
        { data.map((item)=> 
          <li key={item.id}>{item.title}</li>
        )}
      </ul>
    </div>

  )
}

// App Component
function App() {
  const {theme,toggleTheme} = useTheme();

  return (
    <Provider store={store}>
      <CustomHookComponent/>
      <div className='bg-white dark:bg-gray-800'>
      <button >
        {
        theme === 'dark' ? 
        <MoonStar onClick={()=>toggleTheme("")} className="text-gray-600 p-2 w-10 h-10" />
        :
        <Sun onClick={()=>toggleTheme()} className="text-amber-400 p-2 w-10 h-10"/>
        }
      
        </button>
      </div>
      
    

      <TodoApp />
    </Provider>
  );
}

export default App;