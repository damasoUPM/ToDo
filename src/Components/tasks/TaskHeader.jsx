import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    Plus,
    List,
    Menu,
    Filter
} from "lucide-react";
import { motion } from "framer-motion";

export default function TaskHeader({
                                       searchTerm,
                                       setSearchTerm,
                                       onCreateTask,
                                       onShowAll,
                                       showSidebar,
                                       setShowSidebar
                                   }) {
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50"
        >
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Menú Hamburguesa */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowSidebar(!showSidebar)}
                        className="hover:bg-gray-50 transition-colors"
                    >
                        <Menu className="w-5 h-5 text-gray-600" />
                    </Button>

                    {/* Buscador */}
                    <div className="flex-1 max-w-md mx-4">
                        <div className={`relative transition-all duration-300 ${
                            isSearchFocused ? 'transform scale-105' : ''
                        }`}>
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="Buscar tareas..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                                className="pl-10 pr-4 h-11 border-0 bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
                            />
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={onShowAll}
                            className="hover:bg-gray-50 border-gray-200"
                        >
                            <List className="w-4 h-4 text-gray-600" />
                        </Button>

                        <Button
                            onClick={onCreateTask}
                            className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-6 rounded-xl font-medium shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-200"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Nueva Tarea</span>
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}