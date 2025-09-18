import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import TaskHeader from "../components/tasks/TaskHeader";
import TaskItem from "../components/tasks/TaskItem";
import TaskForm from "../components/tasks/TaskForm";
import TaskSidebar from "../components/tasks/TaskSidebar";

export default function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const [activeFilter, setActiveFilter] = useState("todas");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadTasks();
    }, []);

    // ----------------------------
    // FUNCIONES DE API
    // ----------------------------
    const loadTasks = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/tasks");
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Error cargando tareas:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const createTask = async (taskData) => {
        const response = await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData),
        });
        if (!response.ok) throw new Error("Error creando tarea");
        return await response.json();
    };

    const updateTask = async (id, taskData) => {
        const response = await fetch(`/api/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData),
        });
        if (!response.ok) throw new Error("Error actualizando tarea");
        return await response.json();
    };

    const deleteTask = async (id) => {
        const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error eliminando tarea");
    };

    const toggleComplete = async (task) => {
        const response = await fetch(`/api/tasks/${task.id}/complete`, { method: "PUT" });
        if (!response.ok) throw new Error("Error completando tarea");
        return await response.json();
    };

    // ----------------------------
    // HANDLERS
    // ----------------------------
    const handleCreateTask = () => {
        setEditingTask(null);
        setShowForm(true);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleSaveTask = async (taskData) => {
        try {
            if (editingTask) {
                await updateTask(editingTask.id, taskData);
            } else {
                await createTask(taskData);
            }
            setShowForm(false);
            setEditingTask(null);
            loadTasks();
        } catch (error) {
            console.error("Error guardando tarea:", error);
        }
    };

    const handleToggleComplete = async (task) => {
        try {
            await toggleComplete(task);
            loadTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteTask = async (task) => {
        if (!confirm(`¿Seguro que quieres eliminar "${task.title}"?`)) return;
        try {
            await deleteTask(task.id);
            loadTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const handleShowAll = () => {
        setActiveFilter("todas");
        setSearchTerm("");
    };

    // ----------------------------
    // FILTROS
    // ----------------------------
    const getFilteredTasks = () => {
        let filtered = tasks;

        if (searchTerm.trim()) {
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        switch (activeFilter) {
            case "pendientes":
                filtered = filtered.filter(task => !task.completed);
                break;
            case "completadas":
                filtered = filtered.filter(task => task.completed);
                break;
            case "alta_prioridad":
                filtered = filtered.filter(task => task.priority === "HIGH" && !task.completed);
                break;
            default:
                break;
        }

        return filtered;
    };

    const filteredTasks = getFilteredTasks();

    // ----------------------------
    // RENDER
    // ----------------------------
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <TaskHeader
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onCreateTask={handleCreateTask}
                onShowAll={handleShowAll}
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />

            <TaskSidebar
                isOpen={showSidebar}
                onClose={() => setShowSidebar(false)}
                tasks={tasks}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
            />

            <main className={`transition-all duration-300 ${showSidebar ? 'lg:ml-80' : ''}`}>
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {activeFilter === "todas" && "Todas las tareas"}
                            {activeFilter === "pendientes" && "Tareas pendientes"}
                            {activeFilter === "completadas" && "Tareas completadas"}
                            {activeFilter === "alta_prioridad" && "Tareas de alta prioridad"}
                        </h1>
                        <p className="text-gray-600">
                            {searchTerm
                                ? `Mostrando ${filteredTasks.length} resultados para "${searchTerm}"`
                                : `${filteredTasks.length} tareas encontradas`
                            }
                        </p>
                    </div>

                    {isLoading ? (
                        <p>Cargando...</p>
                    ) : filteredTasks.length === 0 ? (
                        <p>No hay tareas</p>
                    ) : (
                        <div className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {filteredTasks.map(task => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        onToggleComplete={handleToggleComplete}
                                        onEdit={handleEditTask}
                                        onDelete={handleDeleteTask}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </main>

            <AnimatePresence>
                {showForm && (
                    <TaskForm
                        task={editingTask}
                        onSave={handleSaveTask}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingTask(null);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
