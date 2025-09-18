package com.example.demo.controllers;

import com.example.demo.Model.Dto.TaskDto;
import com.example.demo.Model.Task;
import com.example.demo.Model.User;
import com.example.demo.Services.UserService;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class HomeController {

    @Autowired
    public UserRepository userRepository;
    @GetMapping("/home")
    public String homePage(Model model) {
        /// Opción 2 ((no se porque no me detecta user com UsrService)
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username);

        //Consigo las 5 tareas que ha creado recientemente
        List<Task> recentTasks = user.getTasks().stream()
                .sorted(Comparator.comparing(Task::getCreatedAt).reversed())
                .limit(5)
                .collect(Collectors.toList());


        model.addAttribute("user", user);
        model.addAttribute("recentTasks", recentTasks);

        return "home";
    }

    @GetMapping("/createTask")
    public String createPage(Model model) {

        model.addAttribute("taskDto", new TaskDto());
        return "createTaskPage";
    }


}
