import React, { useState, useEffect } from 'react';
import { PlusCircle, CheckCircle2, Circle, Trash2, SunMedium, Moon } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: crypto.randomUUID(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const remaining = todos.filter(todo => !todo.completed).length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 to-violet-50'
    }`}>
      <div className="max-w-2xl mx-auto p-4">
        <div className={`rounded-xl shadow-xl p-6 md:p-8 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between mb-8">
            <h1 className={`text-3xl font-bold flex items-center gap-2 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              <SunMedium className="w-8 h-8 text-yellow-500" />
              <span>My Tasks</span>
            </h1>
            <div className="flex items-center gap-4">
              <p className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {remaining} task{remaining !== 1 ? 's' : ''} remaining
              </p>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-yellow-500' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <SunMedium className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <form onSubmit={addTodo} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className={`flex-1 px-4 py-3 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500'
                }`}
              />
              <button
                type="submit"
                className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                <span className="hidden md:inline">Add Task</span>
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {todos.map(todo => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-4 rounded-lg group transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                >
                  {todo.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className={`w-6 h-6 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  )}
                </button>
                <span className={`flex-1 transition-colors duration-300 ${
                  todo.completed 
                    ? 'line-through text-gray-400' 
                    : darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-2 text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {todos.length === 0 && (
            <div className="text-center py-6">
              <p className={`transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                No tasks yet. Add one to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;