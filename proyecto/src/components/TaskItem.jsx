function TaskItem({ task, deleteTask, toggleComplete, startEdit }) {

    return (
        <div>

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>Prioridad: {task.priority}</p>

            <p>Estado: {task.status}</p>

            <p>Fecha límite: {task.dueDate}</p>

            <button onClick={() => deleteTask(task.id)}>
                Eliminar
            </button>

            <button onClick={() => toggleComplete(task.id)}>
                {task.status === "Completada" ? "Desmarcar" : "Completar"}
            </button>

            <button onClick={() => startEdit(task)}>
                Editar
            </button>

        </div>
    );
}


export default TaskItem;