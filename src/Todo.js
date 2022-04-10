import React from 'react'

export default function Todo({ todo, toggleTodo }) {

    function handleTodoClick() {
        toggleTodo(todo.id)
    }
    return (
        <div>
            <span>
                <input type="checkbox" checked={todo.completed} onChange={handleTodoClick}></input>
                {todo.name}
            </span>

        </div>
    )
}
