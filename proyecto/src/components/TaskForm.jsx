import { useState, useEffect } from "react";

function TaskForm({ addTask, editingTask, updateTask, cancelEdit }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Media");
    const [status, setStatus] = useState("Pendiente");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setPriority(editingTask.priority);
            setStatus(editingTask.status);
            setDueDate(editingTask.dueDate);
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("El título es obligatorio");
            return;
        }

        const taskData = {
            id: editingTask ? editingTask.id : Date.now(),
            title,
            description,
            priority,
            status,
            dueDate
        };

        if (editingTask) {
            updateTask(taskData);
        } else {
            addTask(taskData);
        }

        setTitle("");
        setDescription("");
        setPriority("Media");
        setStatus("Pendiente");
        setDueDate("");
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>

            <h2>
                {editingTask ? "Editar Tarea" : "Crear Tarea"}
            </h2>

            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
            />

            <textarea
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
            />

            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
            </select>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Pendiente">Pendiente</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Completada">Completada</option>
            </select>

            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />

            <button type="submit">
                {editingTask ? "Guardar Cambios" : "Crear Tarea"}
            </button>

            {editingTask && (
                <button type="button" onClick={cancelEdit}>
                    Cancelar
                </button>
            )}

        </form>
    );
}

export default TaskForm;