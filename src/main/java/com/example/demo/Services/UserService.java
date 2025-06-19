package com.example.demo.Services;

import com.example.demo.Model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService  {
    private UserRepository userRepository;

    public void registrarUsuario(User user) {
        userRepository.save(user);
    }


    public void iniciarSesion(User user) {}
}
