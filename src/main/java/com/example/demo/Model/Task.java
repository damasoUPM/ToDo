package com.example.demo.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private LocalDateTime deadline;

    public enum priority{LOW,MEDIUM,HIGH,VERY_HIGH}
    @Enumerated(EnumType.STRING)
    private priority priority;

    private boolean completed;

    private LocalDateTime createdAt;
    private LocalDateTime completedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
