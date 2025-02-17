import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleCompleteTodo, deleteTodo, updateTodo,countIncrease,countDecrease } from "./redux/slices/todoSlice";

import { Plus,CheckCircle, Circle, CirclePlus, Minus, Pen, Save, Trash2 } from "lucide-react";
import useTheme from "./hooks/useTheme";

const TodoItem = ({ todo, onToggle, onDelete, onUpdate, onIncrement, onDecrement }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.text);
  
  const handleSave = () => {
    onUpdate(todo.id, updatedText);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-2 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onToggle(todo.id)}
          className="text-gray-500 hover:text-blue-500 transition-colors"
        >
          {todo.completed ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>

        {isEditing ? (
          <>
            <input
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
              className="border-2 rounded text-gray-400"
            />
            <button
              onClick={handleSave}
              className="text-gray-500 hover:text-green-500 transition-colors"
            >
              <Save className="w-6 h-6" />
            </button>
          </>
        ) : (
          <>
            <span
              className={`flex items-center ${
                todo.completed ? "line-through text-gray-400" : "text-gray-700"
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-green-500 transition-colors"
            >
              <Pen className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      <div className="flex items-center px-3">
        <button
          onClick={() => onIncrement(todo.id)}
          className="text-gray-500 hover:text-blue-500 transition-colors"
        >
          <CirclePlus className="w-6 h-6" />
        </button>
        <span className="text-xl mx-2">{todo.value}</span>
        <button
          onClick={() => onDecrement(todo.id)}
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <Minus className="w-6 h-6" />
        </button>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-400 hover:text-red-600 transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};


export const TodoApp = () => {
    // const root = window.document.documentElement;
    // console.log(root)
    // root.classList.add('dark')
    
    const todos = useSelector((state) => state.todo.todos); // Access `todos` from the `todo` slice
    
    const [newTodo, setNewTodo] = useState('');
    const dispatch = useDispatch();
    // const [editing,setEditing] = useState(false);
    const AddTodo = (event) => {
      event.preventDefault();
      if (newTodo.trim()) {
        dispatch(addTodo(newTodo)); // Dispatch the ADD_TODO action
        setNewTodo(''); // Clear the input
      }
    };
    const onToggle = (id)=>{
      dispatch(toggleCompleteTodo(id)); // Dispatch the ADD_TODO action
    }
    const onDelete =(id)=>{
      dispatch(deleteTodo(id)); // Dispatch the ADD_TODO action

    }
    const onUpdate = (id,updatedText)=>{
      dispatch(updateTodo({id,updatedText})); // Dispatch the ADD_TODO action
      // Dispatch the ADD_TODO action
      // setEditing((prev) => !prev)
    }
    const onIncrement =(id)=>{
      dispatch(countIncrease(id)); // Dispatch the ADD_TODO action

    }
    const onDecrement =(id)=>{
      dispatch(countDecrease(id)); // Dispatch the ADD_TODO action

    }
  
    return (
      <div className="min-h-screen bg-gray-200 dark:bg-gray-400 dark:text-red-200 py-8 ">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Todo App</h1>
  
          {/* Input form */}
          <div className="flex gap-2 mb-6 ">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && AddTodo(e)}
              placeholder="Add a new todo..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={AddTodo}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
  
          {/* Todo List */}
          <div className="space-y-2">
          {todos.length > 0 && todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
           
              onToggle={onToggle}
              onDelete={onDelete}
              onDecrement={onDecrement}
              onIncrement={onIncrement}
              onUpdate={onUpdate}
            />
          ))}
        </div>
          
        </div>
      </div>
    );
  };


  // thunk, saga, -> all those data layer opertions
  //  logger -> see all the console log.  