import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {

    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    const deleteTask = (id) => {

        const confirmDelete = window.confirm(
            "¿Seguro que quieres eliminar esta tarea?"
        );

        if (confirmDelete) {
            setTasks(tasks.filter((task) => task.id !== id));
            alert("Tarea eliminada");
        }
    };

    const toggleComplete = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? { ...task, status: task.status === "Completada" ? "Pendiente" : "Completada" }
                    : task
            )
        );
    };

    const [editingTask, setEditingTask] = useState(null);

    const startEdit = (task) => {
        setEditingTask(task);
    };

    const updateTask = (updatedTask) => {
        setTasks(
            tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );

        setEditingTask(null);
    };

    const cancelEdit = () => {
        setEditingTask(null);
    };

    const [filter, setFilter] = useState("Todas");

    const filteredTasks = tasks.filter((task) => {

        const statusMatch =
            filter === "Todas" || task.status === filter;

        const priorityMatch =
            priorityFilter === "Todas" ||
            task.priority === priorityFilter;

        return statusMatch && priorityMatch;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {

        if (sortOption === "title-asc") {
            return a.title.localeCompare(b.title);
        }

        if (sortOption === "title-desc") {
            return b.title.localeCompare(a.title);
        }

        if (sortOption === "newest") {
            return b.id - a.id;
        }

        if (sortOption === "oldest") {
            return a.id - b.id;
        }

        if (sortOption === "dueDate") {
            return (
                new Date(a.dueDate || "9999-12-31") -
                new Date(b.dueDate || "9999-12-31")
            );
        }

        if (sortOption === "priority") {

            const priorityOrder = {
                Alta: 1,
                Media: 2,
                Baja: 3
            };

            return (
                priorityOrder[a.priority] -
                priorityOrder[b.priority]
            );
        }

        return 0;
    });

    const [priorityFilter, setPriorityFilter] = useState("Todas");

    const [sortOption, setSortOption] = useState("");

    return (
        <>
            <h1>Gestor de Tareas</h1>

            <TaskForm
                addTask={addTask}
                editingTask={editingTask}
                updateTask={updateTask}
                cancelEdit={cancelEdit}
            />

            <p>Total de tareas: {tasks.length}</p>

            <div>
                <button onClick={() => setFilter("Todas")}>
                    Todas
                </button>

                <button onClick={() => setFilter("Pendiente")}>
                    Pendientes
                </button>

                <button onClick={() => setFilter("En Progreso")}>
                    En Progreso
                </button>

                <button onClick={() => setFilter("Completada")}>
                    Completadas
                </button>
            </div>

            <div>
                <button onClick={() => setPriorityFilter("Todas")}>
                    Todas las prioridades
                </button>

                <button onClick={() => setPriorityFilter("Alta")}>
                    Alta
                </button>

                <button onClick={() => setPriorityFilter("Media")}>
                    Media
                </button>

                <button onClick={() => setPriorityFilter("Baja")}>
                    Baja
                </button>
            </div>

            <select onChange={(e) => setSortOption(e.target.value)}>

                <option value="">
                    Sin ordenar
                </option>

                <option value="newest">
                    Más recientes
                </option>

                <option value="oldest">
                    Más antiguas
                </option>

                <option value="title-asc">
                    Título A-Z
                </option>

                <option value="title-desc">
                    Título Z-A
                </option>

                <option value="dueDate">
                    Fecha límite más próxima
                </option>

                <option value="priority">
                    Prioridad Alta a Baja
                </option>

            </select>

            <TaskList
                tasks={sortedTasks}
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
                startEdit={startEdit}
            />
        </>
    );
}

export default App;