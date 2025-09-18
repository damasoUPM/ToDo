import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
    Check,
    Trash2,
    Edit3,
    Calendar,
    MoreHorizontal
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
    const [isHovered, setIsHovered] = useState(false);

    const prioridadColors = {
        baja: "bg-green-100 text-green-800 border-green-200",
        media: "bg-yellow-100 text-yellow-800 border-yellow-200",
        alta: "bg-red-100 text-red-800 border-red-200"
    };

    // Generar puntos ondulados para la línea de progreso
    const generateWavePoints = (progress) => {
        const points = [];
        const width = 200;
        const height = 8;
        const waves = 4;

        for (let x = 0; x <= width; x += 2) {
            const y = height/2 + Math.sin((x / width) * Math.PI * waves) * (height/4);
            points.push(`${x},${y}`);
        }
        return points.join(" ");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ y: -2 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group"
        >
            <Card className={`p-6 border-0 shadow-sm hover:shadow-lg transition-all duration-300 ${
                task.completada ? 'bg-gray-50/80' : 'bg-white'
            } ${isHovered ? 'ring-1 ring-blue-500/20' : ''}`}>
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                        {/* Botón de completar */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onToggleComplete(task)}
                            className={`mt-1 hover:scale-110 transition-all duration-200 ${
                                task.completada
                                    ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            <Check className={`w-4 h-4 ${task.completada ? 'opacity-100' : 'opacity-30'}`} />
                        </Button>

                        {/* Contenido de la tarea */}
                        <div className="flex-1 space-y-3">
                            <div>
                                <h3 className={`text-lg font-semibold transition-all duration-200 ${
                                    task.completada
                                        ? 'line-through text-gray-500'
                                        : 'text-gray-900'
                                }`}>
                                    {task.nombre}
                                </h3>
                                {task.descripcion && (
                                    <p className={`text-sm mt-1 ${
                                        task.completada ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                        {task.descripcion}
                                    </p>
                                )}
                            </div>

                            {/* Línea ondulada de progreso */}
                            <div className="relative">
                                <svg width="200" height="16" className="overflow-visible">
                                    {/* Línea base */}
                                    <polyline
                                        points={generateWavePoints(0)}
                                        fill="none"
                                        stroke="#e5e7eb"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                    {/* Línea de progreso */}
                                    <polyline
                                        points={generateWavePoints(task.progreso)}
                                        fill="none"
                                        stroke="#3b82f6"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeDasharray="200"
                                        strokeDashoffset={200 - (task.progreso * 2)}
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>
                                <span className="text-xs text-gray-500 ml-2">
                                    {task.progreso}% completado
                                </span>
                            </div>

                            {/* Metadatos */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <Badge variant="outline" className={`${prioridadColors[task.prioridad]} border`}>
                                    {task.prioridad}
                                </Badge>

                                {task.fecha_limite && (
                                    <Badge variant="outline" className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {format(new Date(task.fecha_limite), 'dd MMM', { locale: es })}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Menú de acciones */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(task)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-blue-600"
                        >
                            <Edit3 className="w-4 h-4 mr-1" />
                            <span className="hidden sm:inline">Editar</span>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => onEdit(task)}>
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => onDelete(task)}
                                    className="text-red-600"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Eliminar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}