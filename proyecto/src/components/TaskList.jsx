import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, toggleComplete }) {
    return (
        <div>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} deleteTask={deleteTask} toggleComplete={toggleComplete} />
            ))}
        </div>
    );
}

export default TaskList;