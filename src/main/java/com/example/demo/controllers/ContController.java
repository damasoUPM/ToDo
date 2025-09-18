package com.example.demo.controllers;

import com.example.demo.Model.Dto.UserDto;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
@Controller
public class ContController {

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("/loginError")
    public String loginError() {
        return "loginError";
    }

    @GetMapping("/signUp")
    public String signupPage(Model model) {
        model.addAttribute("userDto", new UserDto());
        return "signUp";
    }
    @GetMapping("/logout")
    public String logoutPage() {
        return "logout";
    }
    @GetMapping("/error")
    public String errorPage() {
        return "error";
    }

}
