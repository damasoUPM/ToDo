package com.example.demo.Model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String bio;
    private String profilePictureUrl;

    private int scorePointsDoing;
    public enum doRoles{SCROLLING_PRO,NORMAL,GRINDER,HARD_GRINDER,OBSESSIVE}
    @Enumerated(EnumType.STRING)
    private doRoles doRole;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Task> tasks;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Note> restNotes;
}
