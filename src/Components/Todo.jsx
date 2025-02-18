import './CSS/Todo.css'
const Todo = () => {
  return (
    <div className='todo'>
        <div className="todo-header">To-Do List</div>
        <div className="todo-add">
            <input type="text" placeholder='Add your task' className='todo-input' />
            <div className="todo-add-btn">Add</div>
        </div>
        <div className="todo-list">
            
        </div>
    </div>
  )
}

export default Todo