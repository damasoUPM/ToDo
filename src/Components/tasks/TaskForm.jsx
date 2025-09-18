import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { X, Save } from "lucide-react";

export default function TaskForm({ task, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        nombre: task?.nombre || "",
        descripcion: task?.descripcion || "",
        prioridad: task?.prioridad || "media",
        fecha_limite: task?.fecha_limite || "",
        progreso: task?.progreso || 0,
        completada: task?.completada || false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.nombre.trim()) return;
        onSave(formData);
    };

    const handleProgresoChange = (value) => {
        setFormData({ ...formData, progreso: value[0] });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={(e) => e.target === e.currentTarget && onCancel()}
        >
            <Card className="w-full max-w-lg bg-white shadow-2xl border-0">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-semibold text-gray-900">
                            {task ? 'Editar Tarea' : 'Nueva Tarea'}
                        </CardTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onCancel}
                            className="hover:bg-gray-100"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="nombre" className="text-sm font-medium">
                                Nombre de la tarea *
                            </Label>
                            <Input
                                id="nombre"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                placeholder="Ej: Completar informe mensual"
                                className="h-11 rounded-lg border-gray-200 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="descripcion" className="text-sm font-medium">
                                Descripción
                            </Label>
                            <Textarea
                                id="descripcion"
                                value={formData.descripcion}
                                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                placeholder="Añade más detalles sobre la tarea..."
                                className="min-h-[100px] rounded-lg border-gray-200 focus:border-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="prioridad" className="text-sm font-medium">
                                    Prioridad
                                </Label>
                                <Select
                                    value={formData.prioridad}
                                    onValueChange={(value) => setFormData({ ...formData, prioridad: value })}
                                >
                                    <SelectTrigger className="h-11 rounded-lg">
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="baja">Baja</SelectItem>
                                        <SelectItem value="media">Media</SelectItem>
                                        <SelectItem value="alta">Alta</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fecha_limite" className="text-sm font-medium">
                                    Fecha límite
                                </Label>
                                <Input
                                    id="fecha_limite"
                                    type="date"
                                    value={formData.fecha_limite}
                                    onChange={(e) => setFormData({ ...formData, fecha_limite: e.target.value })}
                                    className="h-11 rounded-lg border-gray-200 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-sm font-medium">
                                Progreso: {formData.progreso}%
                            </Label>
                            <Slider
                                value={[formData.progreso]}
                                onValueChange={handleProgresoChange}
                                max={100}
                                step={5}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>0%</span>
                                <span>50%</span>
                                <span>100%</span>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end gap-3 pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            className="px-6"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                            disabled={!formData.nombre.trim()}
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {task ? 'Actualizar' : 'Crear Tarea'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </motion.div>
    );
}