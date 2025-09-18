package com.example.demo.controllers;

import com.example.demo.Exceptions.UserAlreadyExistsException;
import com.example.demo.Model.User;
import com.example.demo.Model.Dto.UserDto;
import com.example.demo.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
@Controller
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;


    @PostMapping("/signUp")
    public String processRegister(@ModelAttribute("userDto") UserDto userDto, Model model ) {
        try {
            System.out.println(userDto.toString());
            if (!userDto.getPassword().equals(userDto.getConfirmPassword())) {
                model.addAttribute("errorMatch", "Passwords do not match");
                return "signup";
            }

            if (!userService.confirmPassword(userDto.getPassword())){
                model.addAttribute("errorConfirm", "Password should have 8 to 16 characters and include upper,lower,special characters and digits");
                return "signup";
            }

            User user = new User();
            user.setUsername(userDto.getUsername());
            user.setEmail(userDto.getEmail());
            user.setPassword(userDto.getPassword());
            userService.signUp(user);

        }catch (UserAlreadyExistsException e){
            model.addAttribute("errorMessage", e.getMessage());
            return "signup"; // Volver a la página de registro con error
        }

        return "login";
    }



}
