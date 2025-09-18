package com.example.demo.Services;

import com.example.demo.Model.Task;
import com.example.demo.Model.User;
import com.example.demo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task saveTask(Task task) {
        task.setCompleted(false);
        task.setCreatedAt(LocalDateTime.now());
        if (!validateTask(task)) return null;
        return taskRepository.save(task);
    }

    public void deleteTask(Task task) {
        taskRepository.delete(task);
    }

    public Iterable<Task> getTasksByUser(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    private boolean validateTask(Task task) {
        if (task == null) return false;


        if (task.getTitle() == null || task.getTitle().isBlank()) {
            return false;
        }


        if (task.getDeadline() == null || task.getDeadline().isBefore(LocalDateTime.now())) {
            return false;
        }


        if (task.getPriority() == null) {
            return false;
        }


        if (task.getCreatedAt() == null || task.getCreatedAt().isAfter(LocalDateTime.now())) {
            return false;
        }


        if (task.isCompleted() && (task.getCompletedAt() == null || task.getCompletedAt().isBefore(task.getCreatedAt()))) {
            return false;
        }
        if (!task.isCompleted() && task.getCompletedAt() != null) {
            return false;
        }

        return true;
    }

    public void completeTask(Task task) {
        task.setCompleted(true);
        task.setCompletedAt(LocalDateTime.now());
        taskRepository.save(task);
    }

    public void editTask(Task task) {
        taskRepository.save(task);
    }


    // Devuelve todas las tareas de un usuario
    public List<Task> findAllByUser(User user) {
        return taskRepository.findByUserId(user.getId());
    }

    // Devuelve una tarea por id
    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);


    }
}