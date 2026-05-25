import TaskItem from "./TaskItem";

function TaskList({
    tasks,
    deleteTask,
    toggleComplete,
    startEdit
}) {

    return (
        <div className="task-list">

            {tasks.map((task) => (

                <TaskItem
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    toggleComplete={toggleComplete}
                    startEdit={startEdit}
                />

            ))}

        </div>
    );
}

export default TaskList;