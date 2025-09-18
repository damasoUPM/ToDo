package com.example.demo.controllers;

import com.example.demo.Model.Dto.TaskDto;
import com.example.demo.Model.Task;
import com.example.demo.Model.User;
import com.example.demo.Services.TaskService;
import com.example.demo.Services.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks") // Ruta base para la API REST
public class TaskRestController {

    private final TaskService taskService;
    private final UserService userService;

    public TaskRestController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    // ----------------------------
    // LISTAR TAREAS
    // ----------------------------
    @GetMapping
    public List<TaskDto> getTasks() {
        User currentUser = getCurrentUser();
        return taskService.findAllByUser(currentUser)
                .stream()
                .map(TaskDto::fromEntity)
                .collect(Collectors.toList());
    }

    // ----------------------------
    // CREAR TAREA
    // ----------------------------
    @PostMapping
    public TaskDto createTask(@RequestBody TaskDto taskDto) {
        Task task = taskDto.toEntity();
        task.setUser(getCurrentUser());
        Task savedTask = taskService.saveTask(task);
        return TaskDto.fromEntity(savedTask);
    }

    // ----------------------------
    // EDITAR TAREA
    // ----------------------------
    @PutMapping("/{id}")
    public TaskDto editTask(@PathVariable Long id, @RequestBody TaskDto taskDto) {
        Task task = taskService.getTaskById(id);
        if (task == null) throw new RuntimeException("Task not found");
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setDeadline(taskDto.getDeadline());
        task.setPriority(Task.priority.valueOf(taskDto.getPriority()));
        Task savedTask = taskService.saveTask(task);
        return TaskDto.fromEntity(savedTask);
    }

    // ----------------------------
    // BORRAR TAREA
    // ----------------------------
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        if (task != null) taskService.deleteTask(task);
    }

    // ----------------------------
    // COMPLETAR TAREA
    // ----------------------------
    @PutMapping("/{id}/complete")
    public TaskDto completeTask(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        if (task != null) taskService.completeTask(task);
        return TaskDto.fromEntity(task);
    }

    // ----------------------------
    // MÉTODO AUXILIAR: Obtener usuario logueado
    // ----------------------------
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return (User) userService.loadUserByUsername(username);
    }
}
