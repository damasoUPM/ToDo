package com.example.demo.Model.Dto;

import com.example.demo.Model.Task;

import java.time.LocalDateTime;

public class TaskDto {

    private String title;
    private String description;
    private LocalDateTime deadline;
    private String priority; // LOW, MEDIUM, HIGH, VERY_HIGH



    public TaskDto() {
    }

    // Getters y Setters

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDateTime deadline) {
        this.deadline = deadline;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }
    // Convierte TaskDto → Task
    public Task toEntity() {
        Task task = new Task();
        task.setTitle(this.title);
        task.setDescription(this.description);
        task.setDeadline(this.deadline);
        if (this.priority != null) {
            task.setPriority(Task.priority.valueOf(this.priority));
        }
        return task;
    }

    // Convierte Task → TaskDto
    public static TaskDto fromEntity(Task task) {
        TaskDto dto = new TaskDto();
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setDeadline(task.getDeadline());
        dto.setPriority(task.getPriority() != null ? task.getPriority().name() : null);
        return dto;
    }

}
