import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    CheckCircle2,
    Clock,
    AlertTriangle,
    Filter,
    X
} from "lucide-react";

export default function TaskSidebar({
                                        isOpen,
                                        onClose,
                                        tasks,
                                        activeFilter,
                                        setActiveFilter
                                    }) {
    const completedTasks = tasks.filter(t => t.completada).length;
    const pendingTasks = tasks.filter(t => !t.completada).length;
    const highPriorityTasks = tasks.filter(t => t.prioridad === 'alta' && !t.completada).length;

    const filters = [
        { id: 'todas', label: 'Todas las tareas', icon: Filter, count: tasks.length },
        { id: 'pendientes', label: 'Pendientes', icon: Clock, count: pendingTasks },
        { id: 'completadas', label: 'Completadas', icon: CheckCircle2, count: completedTasks },
        { id: 'alta_prioridad', label: 'Alta prioridad', icon: AlertTriangle, count: highPriorityTasks }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                        className="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-100 z-50 overflow-y-auto"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Gestión de Tareas
                                </h2>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onClose}
                                    className="lg:hidden"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Estadísticas rápidas */}
                            <Card className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">
                                            {completedTasks}
                                        </div>
                                        <div className="text-sm text-gray-600">Completadas</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-orange-600">
                                            {pendingTasks}
                                        </div>
                                        <div className="text-sm text-gray-600">Pendientes</div>
                                    </div>
                                </div>
                            </Card>

                            {/* Filtros */}
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-gray-700 mb-3">
                                    Filtros
                                </h3>
                                {filters.map((filter) => (
                                    <Button
                                        key={filter.id}
                                        variant={activeFilter === filter.id ? "default" : "ghost"}
                                        onClick={() => setActiveFilter(filter.id)}
                                        className="w-full justify-start h-auto p-3"
                                    >
                                        <filter.icon className="w-4 h-4 mr-3" />
                                        <span className="flex-1 text-left">{filter.label}</span>
                                        <Badge variant="secondary" className="ml-2">
                                            {filter.count}
                                        </Badge>
                                    </Button>
                                ))}
                            </div>

                            {/* Consejos */}
                            <Card className="p-4 mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-100">
                                <h4 className="font-medium text-green-800 mb-2">
                                    💡 Consejo del día
                                </h4>
                                <p className="text-sm text-green-700">
                                    Divide las tareas grandes en subtareas más pequeñas para mejorar tu productividad.
                                </p>
                            </Card>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}